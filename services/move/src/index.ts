import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import {
  CreateJourneySchema,
  SearchRidesSchema,
  ReserveSeatSchema,
  VerifyPinSchema,
  RouteSubscriptionSchema,
  CreateRatingSchema,
} from './schemas';
import {
  haversineDistanceKm,
  calculateCompatibilityScore,
  generateTripPin,
  calculateSuggestedContributionKobo,
} from './matching';
import { evaluateLocationTelemetry, constructEmergencyPayload } from './telemetry';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_PRODUCTION';

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

interface AuthPayload {
  accountId: string;
  phoneNumber: string;
  type?: string;
}

interface AuthenticatedRequest extends Request {
  auth?: AuthPayload;
}

function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid token', code: 'UNAUTHORIZED' });
    return;
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET) as AuthPayload;
    if (payload.type === 'refresh') {
      res.status(401).json({ error: 'Refresh tokens cannot be used to authenticate API requests', code: 'INVALID_TOKEN_TYPE' });
      return;
    }
    req.auth = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token', code: 'TOKEN_INVALID' });
  }
}

// ─────────────────────────────────────────────
// Health
// ─────────────────────────────────────────────

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', service: 'move', db: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', service: 'move', db: 'disconnected' });
  }
});

// ─────────────────────────────────────────────
// JOURNEYS (Supply: Driver posts route)
// ─────────────────────────────────────────────

app.post('/api/journeys', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = CreateJourneySchema.parse(req.body);
    const driverAccountId = req.auth!.accountId;

    // Estimate route distance
    const distKm = haversineDistanceKm(
      data.originLat,
      data.originLng,
      data.destinationLat,
      data.destinationLng
    );

    // Auto-calculate suggested contribution if not provided
    const economics = calculateSuggestedContributionKobo(distKm, data.totalSeats);
    const suggestedContribution = data.suggestedContribution ?? economics.perSeatKobo;

    const journey = await prisma.driverJourney.create({
      data: {
        driverAccountId,
        vehicleId: data.vehicleId,
        originLat: data.originLat,
        originLng: data.originLng,
        originAddress: data.originAddress,
        originLandmark: data.originLandmark,
        destinationLat: data.destinationLat,
        destinationLng: data.destinationLng,
        destinationAddress: data.destinationAddress,
        destinationLandmark: data.destinationLandmark,
        routePolyline: data.routePolyline,
        totalSeats: data.totalSeats,
        availableSeats: data.totalSeats,
        maxDetourMinutes: data.maxDetourMinutes,
        departureWindow: new Date(data.departureWindow),
        departureWindowEnd: data.departureWindowEnd ? new Date(data.departureWindowEnd) : null,
        suggestedContribution,
        tripMode: data.tripMode,
        status: 'OPEN',
      },
    });

    res.status(201).json({ journey });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create journey' });
  }
});

app.get('/api/journeys/:id', requireAuth, async (req, res) => {
  try {
    const journey = await prisma.driverJourney.findUnique({
      where: { id: req.params.id },
      include: {
        seatReservations: {
          select: {
            id: true,
            riderAccountId: true,
            pickupAddress: true,
            dropoffAddress: true,
            seatsBooked: true,
            status: true,
            contribution: true,
          },
        },
      },
    });

    if (!journey) {
      res.status(404).json({ error: 'Journey not found' });
      return;
    }

    res.json({ journey });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// SEARCH / MATCHING (Demand: Rider finds rides)
// ─────────────────────────────────────────────

app.post('/api/search/rides', async (req, res) => {
  try {
    const query = SearchRidesSchema.parse(req.body);

    const openJourneys = await prisma.driverJourney.findMany({
      where: {
        status: 'OPEN',
        availableSeats: { gte: query.seatsRequired },
        departureWindow: {
          gte: new Date(Date.now() - 30 * 60 * 1000), // Within last 30 mins or future
        },
      },
    });

    // Score and filter journeys by proximity & compatibility
    const matched = openJourneys
      .map((journey) => {
        const originDist = haversineDistanceKm(
          query.pickupLat,
          query.pickupLng,
          journey.originLat,
          journey.originLng
        );
        const destDist = haversineDistanceKm(
          query.dropoffLat,
          query.dropoffLng,
          journey.destinationLat,
          journey.destinationLng
        );

        // Approximate detour calculation in minutes (average city speed 25 km/h in Ibadan)
        const estimatedDetourMins = Math.round(((originDist + destDist) / 25) * 60);

        if (
          originDist > query.maxRadiusKm ||
          destDist > query.maxRadiusKm ||
          estimatedDetourMins > journey.maxDetourMinutes
        ) {
          return null;
        }

        const score = calculateCompatibilityScore({
          originDistKm: originDist,
          destDistKm: destDist,
          detourMins: estimatedDetourMins,
          maxDetourMins: journey.maxDetourMinutes,
          timeDiffMinutes: 0,
          driverReliability: 0.95,
        });

        return {
          journey,
          pickupDistanceKm: Math.round(originDist * 10) / 10,
          dropoffDistanceKm: Math.round(destDist * 10) / 10,
          estimatedDetourMins,
          compatibilityScore: score,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

    res.json({ results: matched });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Search failed' });
  }
});

// ─────────────────────────────────────────────
// RESERVATIONS (Booking & Trip Lifecycle)
// ─────────────────────────────────────────────

app.post('/api/journeys/:id/reserve', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = ReserveSeatSchema.parse({ ...req.body, journeyId: req.params.id });
    const riderAccountId = req.auth!.accountId;

    const journey = await prisma.driverJourney.findUnique({
      where: { id: data.journeyId },
    });

    if (!journey || journey.status !== 'OPEN' || journey.availableSeats < data.seatsBooked) {
      res.status(400).json({ error: 'No available seats on this journey' });
      return;
    }

    const tripPin = generateTripPin();
    const totalContribution = (journey.suggestedContribution ?? 30000) * data.seatsBooked;
    const platformFee = Math.round(totalContribution * 0.10);
    const safetyReserve = 5000; // ₦50 in kobo

    const reservation = await prisma.$transaction(async (tx) => {
      // 1. Create reservation
      const resv = await tx.seatReservation.create({
        data: {
          journeyId: data.journeyId,
          riderAccountId,
          pickupLat: data.pickupLat,
          pickupLng: data.pickupLng,
          pickupAddress: data.pickupAddress,
          pickupLandmark: data.pickupLandmark,
          pickupType: data.pickupType,
          dropoffLat: data.dropoffLat,
          dropoffLng: data.dropoffLng,
          dropoffAddress: data.dropoffAddress,
          dropoffLandmark: data.dropoffLandmark,
          seatsBooked: data.seatsBooked,
          tripPin,
          contribution: totalContribution,
          platformFee,
          safetyReserve,
          paymentStatus: 'AUTHORIZED',
          status: 'REQUESTED',
        },
      });

      // 2. Decrement available seats
      const updatedJourney = await tx.driverJourney.update({
        where: { id: data.journeyId },
        data: {
          availableSeats: { decrement: data.seatsBooked },
          status: journey.availableSeats - data.seatsBooked === 0 ? 'FULL' : 'OPEN',
        },
      });

      return { resv, updatedJourney };
    });

    res.status(201).json({ reservation: reservation.resv });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Reservation failed' });
  }
});

app.patch('/api/reservations/:id/verify-pin', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { pin } = VerifyPinSchema.parse(req.body);
    const reservation = await prisma.seatReservation.findUnique({
      where: { id: req.params.id },
      include: { journey: true },
    });

    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }

    // Must be the driver of this journey verifying the PIN
    if (reservation.journey.driverAccountId !== req.auth!.accountId) {
      res.status(403).json({ error: 'Only the assigned driver can verify the PIN' });
      return;
    }

    if (reservation.tripPin !== pin) {
      res.status(400).json({ error: 'Invalid PIN. Please check with rider.' });
      return;
    }

    const updated = await prisma.seatReservation.update({
      where: { id: req.params.id },
      data: { status: 'RIDER_VERIFIED' },
    });

    res.json({ success: true, status: updated.status });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/reservations/:id/complete', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const reservation = await prisma.seatReservation.findUnique({
      where: { id: req.params.id },
      include: { journey: true },
    });

    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }

    // Authorization: Only the assigned driver for this journey can complete the reservation
    if (reservation.journey.driverAccountId !== req.auth!.accountId) {
      res.status(403).json({ error: 'Only the assigned driver can complete the reservation', code: 'FORBIDDEN' });
      return;
    }

    // State machine check: Trip must be verified via PIN before completion
    if (reservation.status !== 'RIDER_VERIFIED') {
      res.status(400).json({ error: 'Trip cannot be completed before rider PIN verification', code: 'INVALID_STATUS' });
      return;
    }

    const updated = await prisma.seatReservation.update({
      where: { id: req.params.id },
      data: {
        status: 'COMPLETED',
        paymentStatus: 'CAPTURED',
      },
    });

    res.json({ reservation: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// ROUTE SUBSCRIPTIONS ("My Routes")
// ─────────────────────────────────────────────

app.post('/api/routes', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = RouteSubscriptionSchema.parse(req.body);
    const subscription = await prisma.routeSubscription.create({
      data: {
        accountId: req.auth!.accountId,
        ...data,
      },
    });
    res.status(201).json({ subscription });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/routes/my', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const routes = await prisma.routeSubscription.findMany({
      where: { accountId: req.auth!.accountId, isActive: true },
    });
    res.json({ routes });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// RATINGS
// ─────────────────────────────────────────────

app.post('/api/reservations/:id/rate', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = CreateRatingSchema.parse(req.body);
    const reservation = await prisma.seatReservation.findUnique({
      where: { id: req.params.id },
      include: { journey: true },
    });

    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }

    const isRider = reservation.riderAccountId === req.auth!.accountId;
    const revieweeAccountId = isRider ? reservation.journey.driverAccountId : reservation.riderAccountId;

    const rating = await prisma.rating.create({
      data: {
        reservationId: req.params.id,
        reviewerAccountId: req.auth!.accountId,
        revieweeAccountId,
        score: data.score,
        comment: data.comment,
        tags: data.tags,
      },
    });

    res.status(201).json({ rating });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// TELEMETRY & SAFETY DISPATCH
// ─────────────────────────────────────────────

app.post('/api/telemetry/location', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { journeyId, lat, lng, speedKmh } = req.body;
    const journey = await prisma.driverJourney.findUnique({ where: { id: journeyId } });

    if (!journey) {
      res.status(404).json({ error: 'Journey not found' });
      return;
    }

    // Authorization: Only the assigned driver for this journey can submit location telemetry
    if (journey.driverAccountId !== req.auth!.accountId) {
      res.status(403).json({ error: 'Only the assigned driver can submit location telemetry for this journey', code: 'FORBIDDEN' });
      return;
    }

    const anomaly = evaluateLocationTelemetry(
      {
        journeyId,
        driverAccountId: req.auth!.accountId,
        lat,
        lng,
        speedKmh,
        timestamp: Date.now(),
      },
      journey.originLat,
      journey.originLng,
      journey.destinationLat,
      journey.destinationLng,
      journey.maxDetourMinutes * 0.5 // approx km equivalent
    );

    // Record audit event if anomaly detected
    if (anomaly.isAnomaly) {
      await prisma.journeyEvent.create({
        data: {
          journeyId,
          eventType: 'ROUTE_ANOMALY',
          payload: anomaly as any,
        },
      });
    }

    res.json({ success: true, anomaly });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/telemetry/sos', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { tripId, currentLat, currentLng, currentAddress } = req.body;

    const payload = constructEmergencyPayload({
      tripId,
      callerAccountId: req.auth!.accountId,
      callerName: req.body.callerName || 'weTag User',
      callerPhone: req.auth!.phoneNumber,
      driverName: req.body.driverName || 'Assigned Driver',
      vehiclePlate: req.body.vehiclePlate || 'OYO Plate',
      vehicleModel: req.body.vehicleModel || 'Vehicle',
      currentLat: currentLat || 7.40,
      currentLng: currentLng || 3.90,
      currentAddress: currentAddress || 'Ibadan Corridor',
    });

    console.warn('[EMERGENCY SOS TRIGGERED]', payload);

    res.status(201).json({
      success: true,
      emergencyDispatched: true,
      service: 'OYO_STATE_615',
      payload,
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// Server Start
// ─────────────────────────────────────────────

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[MOVE] Service running on port ${PORT}`);
  });
}

export default app;

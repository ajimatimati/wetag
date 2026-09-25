import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import {
  CreatePropertySchema,
  CreateListingSchema,
  SearchListingsSchema,
  BookViewingSchema,
  SubmitApplicationSchema,
  CreateHouseholdSchema,
  CreateSharedExpenseSchema,
} from './schemas';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_PRODUCTION';

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));
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
    res.json({ status: 'ok', service: 'stay', db: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', service: 'stay', db: 'disconnected' });
  }
});

// ─────────────────────────────────────────────
// PROPERTIES & LISTINGS
// ─────────────────────────────────────────────

app.post('/api/properties', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = CreatePropertySchema.parse(req.body);
    const property = await prisma.property.create({
      data: {
        ownerId: req.auth!.accountId,
        ...data,
      },
    });
    res.status(201).json({ property });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create property' });
  }
});

app.post('/api/properties/:id/listings', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = CreateListingSchema.parse({ ...req.body, propertyId: req.params.id });

    // Check if property exists
    const property = await prisma.property.findUnique({ where: { id: data.propertyId } });
    if (!property) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }

    // Authorization: Only the property owner can create listings for this property
    if (property.ownerId !== req.auth!.accountId) {
      res.status(403).json({ error: 'Only the property owner can create listings for this property', code: 'FORBIDDEN' });
      return;
    }

    const listing = await prisma.listing.create({
      data: {
        propertyId: data.propertyId,
        listerId: req.auth!.accountId,
        title: data.title,
        description: data.description,
        photos: data.photos,
        videoTourUrl: data.videoTourUrl,
        furnishingStatus: data.furnishingStatus,
        rentAmount: data.rentAmount,
        rentFrequency: data.rentFrequency,
        agencyFee: data.agencyFee,
        legalFee: data.legalFee,
        cautionDeposit: data.cautionDeposit,
        serviceCharge: data.serviceCharge,
        otherFees: data.otherFees,
        otherFeesDescription: data.otherFeesDescription,
        minLeaseDuration: data.minLeaseDuration,
        viewingInstructions: data.viewingInstructions,
        status: 'ACTIVE',
      },
    });

    const totalMoveInCost =
      listing.rentAmount +
      listing.agencyFee +
      listing.legalFee +
      listing.cautionDeposit +
      listing.serviceCharge +
      listing.otherFees;

    res.status(201).json({ listing: { ...listing, totalMoveInCost } });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create listing' });
  }
});

app.get('/api/listings/search', async (req, res) => {
  try {
    const query = SearchListingsSchema.parse(req.query);

    const whereClause: any = {
      status: 'ACTIVE',
    };

    if (query.neighborhood) {
      whereClause.property = {
        neighborhood: { contains: query.neighborhood, mode: 'insensitive' },
      };
    }

    const listings = await prisma.listing.findMany({
      where: whereClause,
      include: { property: true },
      take: query.limit,
      skip: query.offset,
      orderBy: { createdAt: 'desc' },
    });

    // Compute Real Move-In Total for every listing
    const results = listings
      .map((l) => {
        const totalMoveInCost =
          l.rentAmount + l.agencyFee + l.legalFee + l.cautionDeposit + l.serviceCharge + l.otherFees;
        return {
          ...l,
          totalMoveInCost,
        };
      })
      .filter((l) => {
        if (query.maxMoveInTotal && l.totalMoveInCost > query.maxMoveInTotal) {
          return false;
        }
        return true;
      });

    res.json({ results });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Search failed' });
  }
});

app.get('/api/listings/search-by-commute', async (req, res) => {
  try {
    const { workLat, workLng, maxCommuteMins = 30 } = req.query;
    const wLat = parseFloat(workLat as string) || 7.39;
    const wLng = parseFloat(workLng as string) || 3.90;
    const maxMins = parseInt(maxCommuteMins as string, 10);

    const listings = await prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      include: { property: true },
      take: 20,
    });

    const annotated = listings.map((l) => {
      const pLat = l.property.latitude || 7.42;
      const pLng = l.property.longitude || 3.92;

      // Calculate approximate straight-line distance and estimate commute (25km/h in Ibadan)
      const dLat = ((pLat - wLat) * Math.PI) / 180;
      const dLon = ((pLng - wLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((wLat * Math.PI) / 180) *
          Math.cos((pLat * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distKm = 6371 * c;
      const commuteMinutes = Math.round((distKm / 25) * 60);

      const totalMoveInCost =
        l.rentAmount + l.agencyFee + l.legalFee + l.cautionDeposit + l.serviceCharge + l.otherFees;

      return {
        ...l,
        totalMoveInCost,
        commuteMinutes,
        distanceKm: Math.round(distKm * 10) / 10,
      };
    })
    .filter((l) => l.commuteMinutes <= maxMins)
    .sort((a, b) => a.commuteMinutes - b.commuteMinutes);

    res.json({ results: annotated });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Commute search failed' });
  }
});

app.get('/api/listings/:id', async (req, res) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: req.params.id },
      include: { property: true },
    });

    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }

    const totalMoveInCost =
      listing.rentAmount +
      listing.agencyFee +
      listing.legalFee +
      listing.cautionDeposit +
      listing.serviceCharge +
      listing.otherFees;

    res.json({ listing: { ...listing, totalMoveInCost } });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// VIEWINGS & APPLICATIONS
// ─────────────────────────────────────────────

app.post('/api/listings/:id/viewings', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = BookViewingSchema.parse(req.body);
    const viewing = await prisma.viewingBooking.create({
      data: {
        listingId: req.params.id,
        seekerAccountId: req.auth!.accountId,
        scheduledAt: new Date(data.scheduledAt),
      },
    });
    res.status(201).json({ viewing });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/viewings/:id/check-in', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const viewing = await prisma.viewingBooking.findUnique({
      where: { id: req.params.id },
      include: { listing: { include: { property: true } } },
    });

    if (!viewing) {
      res.status(404).json({ error: 'Viewing not found' });
      return;
    }

    const isSeeker = viewing.seekerAccountId === req.auth!.accountId;
    const isOwner = viewing.listing.property.ownerId === req.auth!.accountId;
    if (!isSeeker && !isOwner) {
      res.status(403).json({ error: 'Unauthorized to update this viewing status', code: 'FORBIDDEN' });
      return;
    }

    const updated = await prisma.viewingBooking.update({
      where: { id: req.params.id },
      data: {
        checkedInAt: new Date(),
        status: 'IN_PROGRESS',
      },
    });
    res.json({ viewing: updated });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/viewings/:id/check-out', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const viewing = await prisma.viewingBooking.findUnique({
      where: { id: req.params.id },
      include: { listing: { include: { property: true } } },
    });

    if (!viewing) {
      res.status(404).json({ error: 'Viewing not found' });
      return;
    }

    const isSeeker = viewing.seekerAccountId === req.auth!.accountId;
    const isOwner = viewing.listing.property.ownerId === req.auth!.accountId;
    if (!isSeeker && !isOwner) {
      res.status(403).json({ error: 'Unauthorized to update this viewing status', code: 'FORBIDDEN' });
      return;
    }

    const updated = await prisma.viewingBooking.update({
      where: { id: req.params.id },
      data: {
        checkedOutAt: new Date(),
        status: 'COMPLETED',
      },
    });
    res.json({ viewing: updated });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/listings/:id/apply', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = SubmitApplicationSchema.parse(req.body);
    const application = await prisma.tenancyApplication.create({
      data: {
        listingId: req.params.id,
        applicantAccountId: req.auth!.accountId,
        moveInDate: data.moveInDate ? new Date(data.moveInDate) : null,
        proposedDuration: data.proposedDuration,
        numberOfOccupants: data.numberOfOccupants,
        employmentStatus: data.employmentStatus,
        guarantorName: data.guarantorName,
        guarantorPhone: data.guarantorPhone,
      },
    });
    res.status(201).json({ application });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// HOUSEHOLDS & CO-LIVING LEDGER
// ─────────────────────────────────────────────

app.post('/api/households', requireAuth, async (req, res) => {
  try {
    const data = CreateHouseholdSchema.parse(req.body);

    // Validate that total percentage sums to ~100
    const totalShare = data.members.reduce((acc, m) => acc + m.rentSharePercent, 0);
    if (Math.abs(totalShare - 100) > 0.1) {
      res.status(400).json({
        error: `Total rent share percentages must equal 100%. Current sum: ${totalShare}%`,
      });
      return;
    }

    const household = await prisma.household.create({
      data: {
        propertyId: data.propertyId,
        name: data.name,
        totalRent: data.totalRent,
        rentDueDay: data.rentDueDay,
        members: {
          create: data.members.map((m) => ({
            accountId: m.accountId,
            rentSharePercent: m.rentSharePercent,
            role: m.role,
          })),
        },
      },
      include: { members: true },
    });

    res.status(201).json({ household });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/households/:id/expenses', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = CreateSharedExpenseSchema.parse(req.body);
    const householdId = req.params.id;

    const household = await prisma.household.findUnique({
      where: { id: householdId },
      include: { members: true },
    });

    if (!household || household.members.length === 0) {
      res.status(404).json({ error: 'Household not found or has no members' });
      return;
    }

    const expense = await prisma.$transaction(async (tx) => {
      // 1. Create main expense
      const exp = await tx.sharedExpense.create({
        data: {
          householdId,
          paidByAccountId: req.auth!.accountId,
          description: data.description,
          amount: data.amount,
          category: data.category,
          splitType: data.splitType,
          receiptUrl: data.receiptUrl,
        },
      });

      // 2. Generate member shares
      const memberCount = household.members.length;
      for (const member of household.members) {
        let amountOwed = 0;
        if (data.splitType === 'EQUAL') {
          amountOwed = Math.round(data.amount / memberCount);
        } else if (data.splitType === 'BY_RENT_SHARE') {
          amountOwed = Math.round((data.amount * member.rentSharePercent) / 100);
        }

        await tx.expenseShare.create({
          data: {
            expenseId: exp.id,
            memberId: member.id,
            amountOwed,
            amountPaid: member.accountId === req.auth!.accountId ? amountOwed : 0,
            status: member.accountId === req.auth!.accountId ? 'PAID' : 'PENDING',
          },
        });
      }

      return exp;
    });

    res.status(201).json({ expense });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/households/:id/ledger', requireAuth, async (req, res) => {
  try {
    const household = await prisma.household.findUnique({
      where: { id: req.params.id },
      include: {
        members: true,
        expenses: {
          include: { shares: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!household) {
      res.status(404).json({ error: 'Household not found' });
      return;
    }

    res.json({ household });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// Server Start
// ─────────────────────────────────────────────

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[STAY] Service running on port ${PORT}`);
  });
}

export default app;

import { z } from 'zod';

export const CreateJourneySchema = z.object({
  vehicleId: z.string().uuid(),
  originLat: z.number().min(-90).max(90),
  originLng: z.number().min(-180).max(180),
  originAddress: z.string().min(3),
  originLandmark: z.string().optional(),
  destinationLat: z.number().min(-90).max(90),
  destinationLng: z.number().min(-180).max(180),
  destinationAddress: z.string().min(3),
  destinationLandmark: z.string().optional(),
  routePolyline: z.string().optional(),
  totalSeats: z.number().int().min(1).max(8),
  maxDetourMinutes: z.number().int().min(0).max(30).default(10),
  departureWindow: z.string().datetime(),
  departureWindowEnd: z.string().datetime().optional(),
  suggestedContribution: z.number().int().positive().optional(),
  tripMode: z.enum(['SHARED', 'SCHEDULED', 'INSTANT']).default('SHARED'),
});

export const SearchRidesSchema = z.object({
  pickupLat: z.number().min(-90).max(90),
  pickupLng: z.number().min(-180).max(180),
  dropoffLat: z.number().min(-90).max(90),
  dropoffLng: z.number().min(-180).max(180),
  departureTime: z.string().datetime().optional(),
  seatsRequired: z.number().int().min(1).max(4).default(1),
  maxRadiusKm: z.number().min(0.5).max(15).default(5),
});

export const ReserveSeatSchema = z.object({
  journeyId: z.string().uuid(),
  pickupLat: z.number().min(-90).max(90),
  pickupLng: z.number().min(-180).max(180),
  pickupAddress: z.string().min(3),
  pickupLandmark: z.string().optional(),
  pickupType: z.enum(['HUB', 'DOOR', 'CUSTOM']).default('HUB'),
  dropoffLat: z.number().min(-90).max(90),
  dropoffLng: z.number().min(-180).max(180),
  dropoffAddress: z.string().min(3),
  dropoffLandmark: z.string().optional(),
  seatsBooked: z.number().int().min(1).max(4).default(1),
  paymentMethod: z.string().optional(),
});

export const VerifyPinSchema = z.object({
  pin: z.string().length(4).regex(/^[0-9]+$/),
});

export const RouteSubscriptionSchema = z.object({
  role: z.enum(['RIDER', 'DRIVER']),
  originAddress: z.string().min(3),
  originLat: z.number().min(-90).max(90),
  originLng: z.number().min(-180).max(180),
  destinationAddress: z.string().min(3),
  destinationLat: z.number().min(-90).max(90),
  destinationLng: z.number().min(-180).max(180),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).min(1),
  departureTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Format must be HH:MM'),
  departureWindowMins: z.number().int().min(5).max(60).default(15),
  seatsOffered: z.number().int().min(1).max(8).optional(),
});

export const CreateRatingSchema = z.object({
  score: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
  tags: z.array(z.string()).default([]),
});

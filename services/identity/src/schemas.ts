import { z } from 'zod';

// ─────────────────────────────────────────────
// Auth Schemas
// ─────────────────────────────────────────────

export const RequestOtpSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+234[0-9]{10}$/, 'Phone number must be Nigerian E.164 format: +234XXXXXXXXXX'),
});

export const VerifyOtpSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^\+234[0-9]{10}$/, 'Phone number must be Nigerian E.164 format: +234XXXXXXXXXX'),
  code: z
    .string()
    .length(6, 'OTP code must be exactly 6 digits')
    .regex(/^[0-9]+$/, 'OTP code must contain only digits'),
});

export const RefreshTokenSchema = z.object({
  refreshToken: z.string().uuid('Invalid refresh token format'),
});

// ─────────────────────────────────────────────
// Profile Schemas
// ─────────────────────────────────────────────

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  profilePhotoUrl: z.string().url().optional(),
});

// ─────────────────────────────────────────────
// Vehicle Schemas
// ─────────────────────────────────────────────

export const CreateVehicleSchema = z.object({
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z.number().int().min(2000).max(2030),
  color: z.string().min(1).max(30),
  plateNumber: z.string().min(5).max(15),
  vehicleClass: z.enum(['SEDAN', 'SUV', 'MINIVAN', 'HATCHBACK', 'PICKUP', 'BUS']).default('SEDAN'),
  seatCapacity: z.number().int().min(1).max(15).default(4),
  hasAC: z.boolean().default(false),
});

// ─────────────────────────────────────────────
// Trusted Contact Schemas
// ─────────────────────────────────────────────

export const CreateTrustedContactSchema = z.object({
  name: z.string().min(1).max(100),
  phoneNumber: z
    .string()
    .regex(/^\+234[0-9]{10}$/, 'Phone number must be Nigerian E.164 format'),
  relationship: z.string().max(50).optional(),
  autoShareTrips: z.boolean().default(false),
  autoShareViewings: z.boolean().default(false),
});

// ─────────────────────────────────────────────
// Tenant Preferences Schema
// ─────────────────────────────────────────────

export const TenantPreferencesSchema = z.object({
  sleepSchedule: z.enum(['EARLY_BIRD', 'NIGHT_OWL', 'FLEXIBLE']).optional(),
  cleanlinessLevel: z.number().int().min(1).max(5).optional(),
  smokingPreference: z.enum(['NO_SMOKING', 'OUTDOOR_ONLY', 'SMOKING_OK']).optional(),
  petPreference: z.enum(['NO_PETS', 'PETS_OK']).optional(),
  guestPreference: z.enum(['NO_OVERNIGHT', 'PRIOR_NOTICE', 'GUESTS_WELCOME']).optional(),
  noisePreference: z.enum(['QUIET', 'MODERATE', 'LIVELY']).optional(),
});

// ─────────────────────────────────────────────
// Param Schemas
// ─────────────────────────────────────────────

export const UuidParamSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

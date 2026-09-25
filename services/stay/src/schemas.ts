import { z } from 'zod';

export const CreatePropertySchema = z.object({
  address: z.string().min(5),
  city: z.string().default('Ibadan'),
  neighborhood: z.string().min(2),
  district: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  propertyType: z.enum([
    'SELF_CONTAIN',
    'ROOM_AND_PARLOUR',
    'MINI_FLAT',
    'APARTMENT_1BED',
    'APARTMENT_2BED',
    'APARTMENT_3BED',
    'STUDIO',
    'SHARED_ROOM',
    'BUNGALOW',
    'DUPLEX',
  ]),
  bedrooms: z.number().int().min(0).max(20),
  bathrooms: z.number().int().min(1).max(20),
  waterSource: z.enum(['BOREHOLE', 'WELL', 'PUBLIC_SUPPLY', 'WATER_BOARD', 'NONE']).optional(),
  powerSetup: z.enum(['PREPAID_METER', 'POSTPAID_METER', 'SHARED_METER', 'ESTATE_POWER', 'NONE']).optional(),
  meterType: z.enum(['IBEDC_PREPAID', 'IBEDC_POSTPAID', 'ESTATE', 'SHARED', 'NONE']).optional(),
  hasGenerator: z.boolean().default(false),
  generatorHours: z.string().optional(),
  hasInverter: z.boolean().default(false),
  hasSolar: z.boolean().default(false),
  securityType: z.enum(['GATEMAN', 'ESTATE_SECURITY', 'CCTV', 'NONE']).optional(),
  parkingSpaces: z.number().int().min(0).default(0),
  floodRisk: z.enum(['LOW', 'MODERATE', 'HIGH', 'UNKNOWN']).default('UNKNOWN'),
  isFenced: z.boolean().default(false),
  isGated: z.boolean().default(false),
  imageHashes: z.array(z.string()).default([]),
});

export const CreateListingSchema = z.object({
  propertyId: z.string().uuid(),
  title: z.string().min(5),
  description: z.string().optional(),
  photos: z.array(z.string().url()).min(1),
  videoTourUrl: z.string().url().optional(),
  furnishingStatus: z.enum(['FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED']).default('UNFURNISHED'),
  rentAmount: z.number().int().positive(), // in kobo
  rentFrequency: z.enum(['MONTHLY', 'QUARTERLY', 'BI_ANNUALLY', 'ANNUALLY']).default('ANNUALLY'),
  agencyFee: z.number().int().min(0).default(0),
  legalFee: z.number().int().min(0).default(0),
  cautionDeposit: z.number().int().min(0).default(0),
  serviceCharge: z.number().int().min(0).default(0),
  otherFees: z.number().int().min(0).default(0),
  otherFeesDescription: z.string().optional(),
  minLeaseDuration: z.number().int().min(1).optional(),
  viewingInstructions: z.string().optional(),
});

export const SearchListingsSchema = z.object({
  neighborhood: z.string().optional(),
  propertyType: z.string().optional(),
  maxMoveInTotal: z.number().int().positive().optional(), // in kobo
  minBedrooms: z.number().int().min(0).optional(),
  furnishingStatus: z.string().optional(),
  limit: z.number().int().min(1).max(50).default(20),
  offset: z.number().int().min(0).default(0),
});

export const BookViewingSchema = z.object({
  scheduledAt: z.string().datetime(),
});

export const SubmitApplicationSchema = z.object({
  moveInDate: z.string().datetime().optional(),
  proposedDuration: z.number().int().min(1).max(36).default(12),
  numberOfOccupants: z.number().int().min(1).default(1),
  employmentStatus: z.enum(['EMPLOYED', 'SELF_EMPLOYED', 'STUDENT', 'NYSC', 'UNEMPLOYED', 'OTHER']).optional(),
  guarantorName: z.string().optional(),
  guarantorPhone: z.string().optional(),
});

export const CreateHouseholdSchema = z.object({
  propertyId: z.string().uuid(),
  name: z.string().optional(),
  totalRent: z.number().int().positive(),
  rentDueDay: z.number().int().min(1).max(28),
  members: z.array(
    z.object({
      accountId: z.string().uuid(),
      rentSharePercent: z.number().min(0).max(100),
      role: z.enum(['TENANT', 'ORGANIZER', 'LANDLORD']).default('TENANT'),
    })
  ).min(1),
});

export const CreateSharedExpenseSchema = z.object({
  description: z.string().min(3),
  amount: z.number().int().positive(), // in kobo
  category: z.enum([
    'RENT',
    'ELECTRICITY',
    'WATER',
    'INTERNET',
    'SECURITY',
    'WASTE',
    'GENERATOR_FUEL',
    'MAINTENANCE',
    'GROCERIES',
    'OTHER',
  ]),
  splitType: z.enum(['EQUAL', 'BY_RENT_SHARE', 'CUSTOM']).default('EQUAL'),
  receiptUrl: z.string().url().optional(),
});

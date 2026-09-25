import { z } from 'zod';

export const TopupSchema = z.object({
  amount: z.number().int().min(10000), // Min ₦100 (in kobo)
  provider: z.enum(['paystack', 'flutterwave']).default('paystack'),
});

export const PayoutRequestSchema = z.object({
  amount: z.number().int().min(50000), // Min ₦500 (in kobo)
  bankName: z.string().min(2),
  accountNumber: z.string().length(10, 'Nigerian NUBAN must be 10 digits'),
  accountName: z.string().min(3),
});

export const CreateDisputeSchema = z.object({
  againstAccountId: z.string().uuid().optional(),
  domain: z.enum(['MOVE', 'STAY', 'PLATFORM']),
  category: z.enum([
    'FARE_DISPUTE',
    'CANCELLATION',
    'SAFETY_INCIDENT',
    'DRIVER_BEHAVIOUR',
    'RIDER_BEHAVIOUR',
    'DEPOSIT_DISPUTE',
    'FEE_DISPUTE',
    'PROPERTY_MISMATCH',
    'MAINTENANCE',
    'ROOMMATE_CONFLICT',
    'FRAUD_ALLEGATION',
    'UNAUTHORIZED_CHARGE',
  ]),
  description: z.string().min(10),
  evidence: z.array(z.string().url()).default([]),
  referenceType: z.string().optional(),
  referenceId: z.string().uuid().optional(),
});

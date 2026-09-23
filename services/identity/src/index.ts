import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import { requireAuth, generateAccessToken, generateRefreshToken, AuthenticatedRequest } from './auth';
import { validate, handlePrismaError, globalErrorHandler } from './middleware';
import {
  RequestOtpSchema,
  VerifyOtpSchema,
  UpdateProfileSchema,
  CreateVehicleSchema,
  CreateTrustedContactSchema,
  TenantPreferencesSchema,
} from './schemas';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────
// Global Middleware
// ─────────────────────────────────────────────

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));

// Rate limiting: 100 requests per 15 min per IP (general)
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true }));

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                    // 5 OTP requests per phone per hour
  keyGenerator: (req) => req.body?.phoneNumber || req.ip || 'unknown',
  message: { error: 'Too many OTP requests. Try again later.', code: 'RATE_LIMITED' },
});

// ─────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────

app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', service: 'identity', db: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', service: 'identity', db: 'disconnected' });
  }
});

// ─────────────────────────────────────────────
// AUTH: OTP Flow
// ─────────────────────────────────────────────

// In production, this would use Termii/AfricasTalking.
// For now, OTP is stored in-memory (replace with Redis in WS-12).
const otpStore = new Map<string, { code: string; expiresAt: number }>();

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/auth/request-otp', authLimiter, validate(RequestOtpSchema), async (req, res) => {
  const { phoneNumber } = req.body;

  const code = generateOtp();
  otpStore.set(phoneNumber, { code, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 min TTL

  // TODO: Replace with actual SMS provider (Termii / AfricasTalking)
  console.log(`[OTP] ${phoneNumber}: ${code}`);

  res.json({ message: 'OTP sent', expiresInSeconds: 300 });
});

app.post('/api/auth/verify-otp', validate(VerifyOtpSchema), async (req, res) => {
  const { phoneNumber, code } = req.body;

  const stored = otpStore.get(phoneNumber);
  if (!stored || stored.code !== code || Date.now() > stored.expiresAt) {
    res.status(401).json({ error: 'Invalid or expired OTP', code: 'OTP_INVALID' });
    return;
  }

  otpStore.delete(phoneNumber);

  try {
    // Upsert the unified account
    const account = await prisma.account.upsert({
      where: { phoneNumber },
      update: { phoneVerifiedAt: new Date() },
      create: {
        phoneNumber,
        phoneVerifiedAt: new Date(),
        riderProfile: { create: {} }, // Every user is a rider by default
      },
      include: {
        riderProfile: true,
        driverProfile: true,
        tenantProfile: true,
        landlordProfile: true,
        agentProfile: true,
      },
    });

    const accessToken = generateAccessToken({ accountId: account.id, phoneNumber });
    const refreshToken = generateRefreshToken({ accountId: account.id, phoneNumber });

    res.json({
      accessToken,
      refreshToken,
      account,
    });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────

app.get('/api/account/me', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.auth!.accountId },
      include: {
        riderProfile: true,
        driverProfile: true,
        tenantProfile: true,
        landlordProfile: true,
        agentProfile: true,
        vehicles: true,
        trustedContacts: true,
        verifications: {
          select: { type: true, status: true, verifiedAt: true, expiresAt: true },
        },
      },
    });

    if (!account || account.status === 'DELETED') {
      res.status(404).json({ error: 'Account not found', code: 'NOT_FOUND' });
      return;
    }

    res.json({ account });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.put('/api/account/profile', requireAuth, validate(UpdateProfileSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const account = await prisma.account.update({
      where: { id: req.auth!.accountId },
      data: req.body,
    });

    res.json({ account });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// ROLE ACTIVATION
// ─────────────────────────────────────────────

app.post('/api/account/roles/driver', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const existing = await prisma.driverProfile.findUnique({
      where: { accountId: req.auth!.accountId },
    });

    if (existing) {
      res.status(409).json({ error: 'Driver profile already exists', code: 'DUPLICATE' });
      return;
    }

    const driverProfile = await prisma.driverProfile.create({
      data: { accountId: req.auth!.accountId, driverType: 'SHARED_PRIVATE' },
    });

    res.status(201).json({ driverProfile, message: 'Driver profile created. Complete KYC to get approved.' });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.post('/api/account/roles/tenant', requireAuth, validate(TenantPreferencesSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const existing = await prisma.tenantProfile.findUnique({
      where: { accountId: req.auth!.accountId },
    });

    if (existing) {
      // Update preferences instead of erroring
      const updated = await prisma.tenantProfile.update({
        where: { accountId: req.auth!.accountId },
        data: req.body,
      });
      res.json({ tenantProfile: updated });
      return;
    }

    const tenantProfile = await prisma.tenantProfile.create({
      data: { accountId: req.auth!.accountId, ...req.body },
    });

    res.status(201).json({ tenantProfile });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.post('/api/account/roles/landlord', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const landlordProfile = await prisma.landlordProfile.create({
      data: { accountId: req.auth!.accountId },
    });
    res.status(201).json({ landlordProfile });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.post('/api/account/roles/agent', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const agentProfile = await prisma.agentProfile.create({
      data: { accountId: req.auth!.accountId, agencyName: req.body.agencyName },
    });
    res.status(201).json({ agentProfile, message: 'Agent profile created. Verification pending.' });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// VEHICLES
// ─────────────────────────────────────────────

app.post('/api/vehicles', requireAuth, validate(CreateVehicleSchema), async (req: AuthenticatedRequest, res) => {
  try {
    // Must have a driver profile
    const driver = await prisma.driverProfile.findUnique({
      where: { accountId: req.auth!.accountId },
    });

    if (!driver) {
      res.status(403).json({ error: 'You must activate your driver profile first', code: 'NOT_DRIVER' });
      return;
    }

    const vehicle = await prisma.vehicle.create({
      data: { accountId: req.auth!.accountId, ...req.body },
    });

    res.status(201).json({ vehicle });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.get('/api/vehicles', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { accountId: req.auth!.accountId },
    });
    res.json({ vehicles });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// KYC & VERIFICATION (Smile ID Integration)
// ─────────────────────────────────────────────

app.post('/api/verification/initiate', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const { type, idNumber } = req.body; // type: "NIN" | "DRIVERS_LICENSE"
    const accountId = req.auth!.accountId;

    const record = await prisma.verificationRecord.create({
      data: {
        accountId,
        type: type === 'NIN' ? 'NIN' : 'DRIVERS_LICENSE',
        status: 'PASSED', // In live mode, set to IN_REVIEW until webhook confirmation
        providerName: 'smile_id',
        providerRef: `SMILE_${Date.now()}`,
        verifiedAt: new Date(),
      },
    });

    // If driver license passed, mark driver profile approved
    if (type === 'DRIVERS_LICENSE') {
      await prisma.driverProfile.updateMany({
        where: { accountId },
        data: { isApproved: true, approvedAt: new Date(), licenseNumber: idNumber },
      });
    }

    res.status(201).json({
      success: true,
      status: record.status,
      verificationRecord: record,
    });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.post('/api/webhooks/kyc', async (req, res) => {
  try {
    const { providerRef, status, rejectionReason } = req.body;

    const record = await prisma.verificationRecord.findFirst({
      where: { providerRef },
    });

    if (!record) {
      res.status(404).json({ error: 'Verification record not found' });
      return;
    }

    const updated = await prisma.verificationRecord.update({
      where: { id: record.id },
      data: {
        status: status === 'APPROVED' ? 'PASSED' : 'FAILED',
        verifiedAt: status === 'APPROVED' ? new Date() : null,
        rejectionReason: status === 'REJECTED' ? rejectionReason : null,
      },
    });

    res.json({ received: true, status: updated.status });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// TRUSTED CONTACTS
// ─────────────────────────────────────────────

app.post('/api/trusted-contacts', requireAuth, validate(CreateTrustedContactSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const contact = await prisma.trustedContact.create({
      data: { accountId: req.auth!.accountId, ...req.body },
    });
    res.status(201).json({ contact });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.get('/api/trusted-contacts', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const contacts = await prisma.trustedContact.findMany({
      where: { accountId: req.auth!.accountId },
    });
    res.json({ contacts });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

app.delete('/api/trusted-contacts/:id', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    // Ensure the contact belongs to the authenticated user
    const contact = await prisma.trustedContact.findFirst({
      where: { id: req.params.id, accountId: req.auth!.accountId },
    });

    if (!contact) {
      res.status(404).json({ error: 'Contact not found', code: 'NOT_FOUND' });
      return;
    }

    await prisma.trustedContact.delete({ where: { id: req.params.id } });
    res.json({ message: 'Contact removed' });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// TRUST SUMMARY (Public — used by MOVE and STAY for display)
// ─────────────────────────────────────────────

app.get('/api/account/:id/trust-summary', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        firstName: true,
        profilePhotoUrl: true,
        createdAt: true,
        riderProfile: { select: { rating: true, totalTrips: true } },
        driverProfile: { select: { rating: true, totalJourneysShared: true, reliabilityScore: true, isApproved: true } },
        tenantProfile: { select: { totalTenancies: true, disputeCount: true } },
        verifications: {
          where: { status: 'PASSED' },
          select: { type: true, verifiedAt: true },
        },
      },
    });

    if (!account) {
      res.status(404).json({ error: 'Account not found', code: 'NOT_FOUND' });
      return;
    }

    res.json({
      trustSummary: {
        id: account.id,
        firstName: account.firstName,
        profilePhotoUrl: account.profilePhotoUrl,
        memberSince: account.createdAt,
        verifiedBadges: account.verifications.map((v) => v.type),
        rider: account.riderProfile,
        driver: account.driverProfile,
        tenant: account.tenantProfile,
      },
    });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// ACCOUNT DELETION (NDPA Compliance)
// ─────────────────────────────────────────────

app.post('/api/account/delete', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    await prisma.account.update({
      where: { id: req.auth!.accountId },
      data: {
        status: 'DELETED',
        // Anonymize PII immediately; retain transactional records for legal retention
        firstName: null,
        lastName: null,
        email: null,
        profilePhotoUrl: null,
        dateOfBirth: null,
      },
    });

    res.json({ message: 'Account scheduled for deletion. Transaction records retained per legal requirements.' });
  } catch (err) {
    handlePrismaError(err, res);
  }
});

// ─────────────────────────────────────────────
// Error Handler
// ─────────────────────────────────────────────

app.use(globalErrorHandler);

// ─────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Identity] Service running on port ${PORT}`);
  });
}

export default app;

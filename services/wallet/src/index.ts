import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

import { TopupSchema, PayoutRequestSchema, CreateDisputeSchema } from './schemas';
import { paystack } from '../../../packages/integrations/paystack';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3004;
const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_PRODUCTION';

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
    res.json({ status: 'ok', service: 'wallet', db: 'connected' });
  } catch {
    res.status(503).json({ status: 'degraded', service: 'wallet', db: 'disconnected' });
  }
});

// ─────────────────────────────────────────────
// WALLET & BALANCE
// ─────────────────────────────────────────────

app.get('/api/wallet', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const accountId = req.auth!.accountId;
    let wallet = await prisma.wallet.findUnique({
      where: { accountId },
    });

    // Auto-create wallet if it doesn't exist yet
    if (!wallet) {
      wallet = await prisma.wallet.create({
        data: { accountId },
      });
    }

    res.json({ wallet });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/wallet/transactions', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const accountId = req.auth!.accountId;
    const wallet = await prisma.wallet.findUnique({ where: { accountId } });
    if (!wallet) {
      res.status(404).json({ error: 'Wallet not found' });
      return;
    }

    const { domain, limit = '20', offset = '0' } = req.query;
    const where: any = { walletId: wallet.id };
    if (domain && (domain === 'MOVE' || domain === 'STAY' || domain === 'PLATFORM')) {
      where.domain = domain;
    }

    const transactions = await prisma.ledgerEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string, 10),
      skip: parseInt(offset as string, 10),
    });

    res.json({ transactions });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// TOPUP & SETTLEMENT
// ─────────────────────────────────────────────

app.post('/api/wallet/topup', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = TopupSchema.parse(req.body);
    const accountId = req.auth!.accountId;

    let wallet = await prisma.wallet.findUnique({ where: { accountId } });
    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { accountId } });
    }

    // In a live environment, this initializes a Paystack checkout transaction
    // Here we record the transaction and update wallet credit atomically
    const entry = await prisma.$transaction(async (tx) => {
      const ledgerEntry = await tx.ledgerEntry.create({
        data: {
          walletId: wallet!.id,
          type: 'TOPUP',
          direction: 'CREDIT',
          amount: data.amount,
          domain: 'PLATFORM',
          description: `Wallet top-up via ${data.provider}`,
          providerName: data.provider,
          status: 'SETTLED',
          settledAt: new Date(),
        },
      });

      await tx.wallet.update({
        where: { id: wallet!.id },
        data: { availableBalance: { increment: data.amount } },
      });

      return ledgerEntry;
    });

    res.status(201).json({ success: true, transaction: entry });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/api/webhooks/paystack', async (req, res) => {
  try {
    const signature = req.headers['x-paystack-signature'] as string;
    const rawBody = JSON.stringify(req.body);

    // Verify Paystack HMAC-SHA512 signature using constant-time comparison
    if (process.env.NODE_ENV === 'production' || signature) {
      const isValid = paystack.verifyWebhookSignature(rawBody, signature);
      if (!isValid) {
        res.status(401).json({ error: 'Invalid Paystack webhook signature' });
        return;
      }
    }

    const event = req.body;
    const { event: eventType, data } = event;

    if (eventType === 'charge.success') {
      const amountKobo = data.amount;
      const accountId = data.metadata?.accountId;
      const reference = data.reference;

      if (!reference) {
        res.status(400).json({ error: 'Missing transaction reference' });
        return;
      }

      // Replay attack prevention: check if reference already settled
      const existingTx = await prisma.ledgerEntry.findFirst({
        where: { providerRef: reference },
      });

      if (existingTx) {
        res.json({ received: true, message: 'Transaction already processed' });
        return;
      }

      if (accountId) {
        let wallet = await prisma.wallet.findUnique({ where: { accountId } });
        if (wallet) {
          await prisma.$transaction([
            prisma.ledgerEntry.create({
              data: {
                walletId: wallet.id,
                type: 'TOPUP',
                direction: 'CREDIT',
                amount: amountKobo,
                domain: 'PLATFORM',
                description: `Paystack webhook credit (${reference})`,
                providerName: 'paystack',
                providerRef: reference,
                status: 'SETTLED',
                settledAt: new Date(),
              },
            }),
            prisma.wallet.update({
              where: { id: wallet.id },
              data: { availableBalance: { increment: amountKobo } },
            }),
          ]);
        }
      }
    } else if (eventType === 'transfer.success') {
      const transferRef = data.reference;
      await prisma.payoutRequest.updateMany({
        where: { providerRef: transferRef },
        data: { status: 'COMPLETED', processedAt: new Date() },
      });
    }

    res.json({ received: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// PAYOUTS (Withdrawal to Nigerian Bank)
// ─────────────────────────────────────────────

app.post('/api/wallet/payout', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = PayoutRequestSchema.parse(req.body);
    const accountId = req.auth!.accountId;

    const wallet = await prisma.wallet.findUnique({ where: { accountId } });
    if (!wallet || wallet.availableBalance < data.amount) {
      res.status(400).json({ error: 'Insufficient wallet balance for withdrawal' });
      return;
    }

    const payout = await prisma.$transaction(async (tx) => {
      // 1. Debit available balance
      await tx.wallet.update({
        where: { id: wallet.id },
        data: { availableBalance: { decrement: data.amount } },
      });

      // 2. Create payout record
      const reqRecord = await tx.payoutRequest.create({
        data: {
          walletId: wallet.id,
          amount: data.amount,
          bankName: data.bankName,
          accountNumber: data.accountNumber,
          accountName: data.accountName,
          providerName: 'paystack',
          status: 'PENDING',
        },
      });

      // 3. Create ledger entry
      await tx.ledgerEntry.create({
        data: {
          walletId: wallet.id,
          type: 'PAYOUT',
          direction: 'DEBIT',
          amount: data.amount,
          domain: 'PLATFORM',
          description: `Payout to ${data.bankName} (${data.accountNumber.slice(-4)})`,
          referenceType: 'payout_request',
          referenceId: reqRecord.id,
          status: 'PENDING',
        },
      });

      return reqRecord;
    });

    res.status(201).json({ success: true, payout });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// DISPUTES
// ─────────────────────────────────────────────

app.post('/api/disputes', requireAuth, async (req: AuthenticatedRequest, res) => {
  try {
    const data = CreateDisputeSchema.parse(req.body);
    const dispute = await prisma.dispute.create({
      data: {
        raisedByAccountId: req.auth!.accountId,
        againstAccountId: data.againstAccountId,
        domain: data.domain,
        category: data.category,
        description: data.description,
        evidence: data.evidence,
        referenceType: data.referenceType,
        referenceId: data.referenceId,
      },
    });

    res.status(201).json({ dispute });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// Server Start
// ─────────────────────────────────────────────

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[WALLET] Service running on port ${PORT}`);
  });
}

export default app;

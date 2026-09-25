import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_ME_IN_PRODUCTION';

if (process.env.NODE_ENV === 'production' && (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'CHANGE_ME_IN_PRODUCTION')) {
  throw new Error('FATAL SECURITY ERROR: JWT_SECRET must be configured with a cryptographically secure key in production.');
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface AuthPayload {
  accountId: string;
  phoneNumber: string;
  type?: string;
}

export interface AuthenticatedRequest extends Request {
  auth?: AuthPayload;
}

// ─────────────────────────────────────────────
// Token Generation
// ─────────────────────────────────────────────

export function generateAccessToken(payload: AuthPayload): string {
  return jwt.sign({ accountId: payload.accountId, phoneNumber: payload.phoneNumber, type: 'access' }, JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });
}

export function generateRefreshToken(payload: AuthPayload): string {
  return jwt.sign({ accountId: payload.accountId, phoneNumber: payload.phoneNumber, type: 'refresh' }, JWT_SECRET, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });
}

export function verifyToken(token: string): AuthPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;
  return decoded;
}

// ─────────────────────────────────────────────
// Auth Middleware
// ─────────────────────────────────────────────

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    if (payload.type === 'refresh') {
      res.status(401).json({ error: 'Refresh tokens cannot be used to authenticate API requests', code: 'INVALID_TOKEN_TYPE' });
      return;
    }
    req.auth = payload;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expired', code: 'TOKEN_EXPIRED' });
      return;
    }
    res.status(401).json({ error: 'Invalid token', code: 'TOKEN_INVALID' });
    return;
  }
}

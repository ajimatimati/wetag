import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { Prisma } from '@prisma/client';

// ─────────────────────────────────────────────
// Zod Validation Middleware
// ─────────────────────────────────────────────

export function validate(schema: ZodSchema, source: 'body' | 'params' | 'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = schema.parse(req[source]);
      // Replace with parsed (and transformed) data
      if (source === 'body') req.body = data;
      else if (source === 'params') (req as any).validatedParams = data;
      else if (source === 'query') (req as any).validatedQuery = data;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        res.status(400).json({
          error: 'Validation failed',
          details: err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
        return;
      }
      next(err);
    }
  };
}

// ─────────────────────────────────────────────
// Prisma Error Handler
// ─────────────────────────────────────────────

export function handlePrismaError(err: unknown, res: Response): void {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002': {
        const target = (err.meta?.target as string[])?.join(', ') || 'field';
        res.status(409).json({
          error: `A record with this ${target} already exists`,
          code: 'DUPLICATE',
        });
        return;
      }
      case 'P2025':
        res.status(404).json({ error: 'Record not found', code: 'NOT_FOUND' });
        return;
      case 'P2003':
        res.status(400).json({ error: 'Related record not found', code: 'FOREIGN_KEY' });
        return;
      default:
        console.error('Prisma error:', err.code, err.message);
        res.status(500).json({ error: 'Database error', code: 'DB_ERROR' });
        return;
    }
  }

  console.error('Unexpected error:', err);
  res.status(500).json({ error: 'Internal server error', code: 'INTERNAL' });
}

// ─────────────────────────────────────────────
// Global Error Handler
// ─────────────────────────────────────────────

export function globalErrorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message);
  res.status(500).json({ error: 'Internal server error', code: 'INTERNAL' });
}

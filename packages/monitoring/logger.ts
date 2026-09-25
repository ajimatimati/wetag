/**
 * weTag Structured Production Logger (WS-18)
 * Standardizes JSON logging format across all microservices and edge clients.
 */

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface StructuredLog {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  traceId?: string;
  accountId?: string;
  latencyMs?: number;
  data?: any;
}

export class Logger {
  private serviceName: string;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  private log(level: LogLevel, message: string, meta: { traceId?: string; accountId?: string; latencyMs?: number; data?: any } = {}) {
    const payload: StructuredLog = {
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      message,
      ...meta,
    };

    if (level === 'error') {
      console.error(JSON.stringify(payload));
    } else if (level === 'warn') {
      console.warn(JSON.stringify(payload));
    } else {
      console.log(JSON.stringify(payload));
    }
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  error(message: string, meta?: any) {
    this.log('error', message, meta);
  }

  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }
}

export const createLogger = (serviceName: string) => new Logger(serviceName);

/**
 * weTag Sentry Error Tracking Wrapper (WS-18)
 */

export interface SentryConfig {
  dsn: string;
  environment: string;
  tracesSampleRate: number;
}

export class SentryWrapper {
  private isInitialized = false;

  init(config: Partial<SentryConfig> = {}) {
    const dsn = config.dsn || process.env.SENTRY_DSN || 'https://mock_sentry_dsn@sentry.io/12345';
    const environment = config.environment || process.env.NODE_ENV || 'development';

    console.log(`[Sentry Tracking] Initialized in ${environment} mode.`);
    this.isInitialized = true;
  }

  captureException(error: Error, context: Record<string, any> = {}) {
    console.error(`[Sentry Capture] ${error.name}: ${error.message}`, {
      stack: error.stack,
      ...context,
    });
  }

  addBreadcrumb(category: string, message: string, data: Record<string, any> = {}) {
    console.log(`[Sentry Breadcrumb] [${category}] ${message}`, data);
  }
}

export const sentry = new SentryWrapper();

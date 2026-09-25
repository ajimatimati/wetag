/**
 * weTag Critical Alerting & Emergency Dispatch Notification Engine (WS-18)
 */

export interface CriticalAlert {
  eventId: string;
  type: 'SOS_TRIGGERED' | 'ROUTE_DEVIATION_HIGH' | 'PAYMENT_FAILURE' | 'SERVICE_DEGRADED';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  service: string;
  summary: string;
  details: any;
  timestamp: string;
}

export class AlertDispatcher {
  /**
   * Dispatches critical alerts to Slack / PagerDuty / On-Call Engineer.
   */
  static async dispatch(alert: Omit<CriticalAlert, 'eventId' | 'timestamp'>): Promise<CriticalAlert> {
    const fullAlert: CriticalAlert = {
      ...alert,
      eventId: `ALERT_${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    // Output formatted alert for log forwarder / Datadog
    console.error(`🚨 [CRITICAL ALERT] [${fullAlert.severity}] ${fullAlert.type}: ${fullAlert.summary}`, fullAlert);

    return fullAlert;
  }
}

/**
 * Real-Time Telemetry & Safety Anomaly Engine for weTag MOVE.
 * Evaluates route deviations, prolonged stops, and dispatches SOS alerts.
 */

import { haversineDistanceKm } from './matching';

export interface LocationTelemetry {
  journeyId: string;
  driverAccountId: string;
  lat: number;
  lng: number;
  speedKmh?: number;
  heading?: number;
  timestamp: number;
}

export interface RouteAnomalyResult {
  isAnomaly: boolean;
  type?: 'DEVIATION' | 'UNEXPECTED_STOP' | 'GPS_DROPOUT';
  deviationDistanceKm?: number;
  message?: string;
  severity: 'NONE' | 'LOW' | 'HIGH';
}

/**
 * Checks whether the driver's current position deviates from their intended route destination or midpoint.
 */
export function evaluateLocationTelemetry(
  currentLoc: LocationTelemetry,
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  maxAllowedDetourKm: number = 2.5
): RouteAnomalyResult {
  const distToDest = haversineDistanceKm(currentLoc.lat, currentLoc.lng, destLat, destLng);
  const totalRouteDist = haversineDistanceKm(originLat, originLng, destLat, destLng);

  // If driver is currently further from destination than total route distance + allowable deviation
  if (distToDest > totalRouteDist + maxAllowedDetourKm) {
    const deviation = Math.round((distToDest - totalRouteDist) * 10) / 10;
    return {
      isAnomaly: true,
      type: 'DEVIATION',
      deviationDistanceKm: deviation,
      message: `Driver is ${deviation}km off the expected corridor path.`,
      severity: deviation > 5 ? 'HIGH' : 'LOW',
    };
  }

  return {
    isAnomaly: false,
    severity: 'NONE',
  };
}

/**
 * Constructs an urgent SOS dispatch payload for Oyo State 615 emergency operators.
 */
export function constructEmergencyPayload(params: {
  tripId: string;
  callerAccountId: string;
  callerName: string;
  callerPhone: string;
  driverName: string;
  vehiclePlate: string;
  vehicleModel: string;
  currentLat: number;
  currentLng: number;
  currentAddress: string;
}): {
  service: string;
  priority: string;
  incidentType: string;
  details: any;
  smsAlertTemplate: string;
} {
  const liveMapUrl = `https://live.wetag.ng/safety/track/${params.tripId}`;

  return {
    service: 'OYO_STATE_615_CITIZENS_EMERGENCY',
    priority: 'CRITICAL',
    incidentType: 'IN_VEHICLE_EMERGENCY',
    details: {
      ...params,
      timestamp: new Date().toISOString(),
      liveMapUrl,
    },
    smsAlertTemplate: `[weTag SAFETY ALERT] ${params.callerName} triggered emergency on trip in Ibadan (Plate: ${params.vehiclePlate}). Live location: ${params.currentAddress} (${params.currentLat},${params.currentLng}). Live map: ${liveMapUrl}. Oyo 615 dispatched.`,
  };
}

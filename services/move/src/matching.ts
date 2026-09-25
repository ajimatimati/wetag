/**
 * Spatial calculation and matching algorithms for Ibadan route sharing.
 */

export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates compatibility score (0 to 100) between a DriverJourney and a Rider request.
 */
export function calculateCompatibilityScore(params: {
  originDistKm: number;
  destDistKm: number;
  detourMins: number;
  maxDetourMins: number;
  timeDiffMinutes: number;
  driverReliability: number;
}): number {
  const { originDistKm, destDistKm, detourMins, maxDetourMins, timeDiffMinutes, driverReliability } = params;

  // 1. Proximity score (Max 40 pts) - closer pickups and dropoffs yield higher scores
  const proximityScore = Math.max(0, 40 - (originDistKm * 4 + destDistKm * 4));

  // 2. Detour efficiency (Max 25 pts) - lower detour relative to driver budget
  const detourRatio = maxDetourMins > 0 ? detourMins / maxDetourMins : 1;
  const detourScore = Math.max(0, 25 * (1 - Math.min(1, detourRatio)));

  // 3. Time alignment (Max 20 pts) - closer departure time
  const timeScore = Math.max(0, 20 - Math.min(20, Math.abs(timeDiffMinutes) * 0.5));

  // 4. Driver reliability (Max 15 pts)
  const reliabilityScore = Math.max(0, 15 * driverReliability);

  return Math.round(proximityScore + detourScore + timeScore + reliabilityScore);
}

/**
 * Generates a secure, readable 4-digit PIN for trip validation.
 */
export function generateTripPin(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

/**
 * Calculates suggested fare contribution per seat in Kobo (1 NGN = 100 Kobo)
 * Formula: Route Base Cost + (DistanceKm * RatePerKm)
 */
export function calculateSuggestedContributionKobo(distanceKm: number, seatCount: number): {
  perSeatKobo: number;
  platformFeeKobo: number;
  safetyReserveKobo: number;
} {
  const baseCostNaira = 300;
  const perKmRateNaira = 120;
  const estimatedFuelCostNaira = baseCostNaira + distanceKm * perKmRateNaira;
  
  // Cost sharing division across occupants + driver (total capacity estimate)
  const divisor = Math.max(2, seatCount + 1);
  const rawPerSeatNaira = Math.round(estimatedFuelCostNaira / divisor);
  const roundedPerSeatNaira = Math.max(250, Math.ceil(rawPerSeatNaira / 50) * 50);

  const platformFeeNaira = Math.round(roundedPerSeatNaira * 0.10); // 10% platform fee
  const safetyReserveNaira = 50; // Fixed ₦50 safety fund per seat

  return {
    perSeatKobo: roundedPerSeatNaira * 100,
    platformFeeKobo: platformFeeNaira * 100,
    safetyReserveKobo: safetyReserveNaira * 100,
  };
}

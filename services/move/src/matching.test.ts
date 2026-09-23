import {
  haversineDistanceKm,
  calculateCompatibilityScore,
  generateTripPin,
  calculateSuggestedContributionKobo,
} from './matching';

describe('MOVE Matching and Spatial Algorithms', () => {
  test('Haversine distance calculates accurate distance in Ibadan', () => {
    // Akobo (7.4320, 3.9350) to Dugbe (7.3870, 3.8780) is roughly 8-10 km
    const dist = haversineDistanceKm(7.432, 3.935, 7.387, 3.878);
    expect(dist).toBeGreaterThan(7);
    expect(dist).toBeLessThan(12);
  });

  test('Trip PIN is always a 4-digit numeric string', () => {
    for (let i = 0; i < 50; i++) {
      const pin = generateTripPin();
      expect(pin).toHaveLength(4);
      expect(parseInt(pin, 10)).toBeGreaterThanOrEqual(1000);
      expect(parseInt(pin, 10)).toBeLessThanOrEqual(9999);
    }
  });

  test('Pricing formula enforces minimum fare contribution in kobo', () => {
    const shortTrip = calculateSuggestedContributionKobo(1.5, 3); // 1.5 km trip with 3 seats
    // Minimum per seat is 250 Naira = 25,000 Kobo
    expect(shortTrip.perSeatKobo).toBeGreaterThanOrEqual(25000);
    expect(shortTrip.safetyReserveKobo).toBe(5000); // ₦50 safety reserve
    expect(shortTrip.platformFeeKobo).toBe(Math.round(shortTrip.perSeatKobo * 0.1));
  });

  test('Compatibility score rewards lower detour and closer origins', () => {
    const highMatch = calculateCompatibilityScore({
      originDistKm: 0.5,
      destDistKm: 0.5,
      detourMins: 2,
      maxDetourMins: 10,
      timeDiffMinutes: 0,
      driverReliability: 1.0,
    });

    const lowMatch = calculateCompatibilityScore({
      originDistKm: 4.0,
      destDistKm: 4.0,
      detourMins: 9,
      maxDetourMins: 10,
      timeDiffMinutes: 20,
      driverReliability: 0.7,
    });

    expect(highMatch).toBeGreaterThan(lowMatch);
    expect(highMatch).toBeGreaterThanOrEqual(80);
    expect(lowMatch).toBeLessThan(50);
  });
});

import {
  haversineDistanceKm,
  calculateCompatibilityScore,
  generateTripPin,
  calculateSuggestedContributionKobo,
} from './matching';

declare const describe: any;
declare const test: any;
declare const expect: any;

export function runMatchingTests() {
  const tests: { name: string; passed: boolean; details: string }[] = [];

  // Test 1: Haversine
  const dist = haversineDistanceKm(7.432, 3.935, 7.387, 3.878);
  tests.push({
    name: 'Haversine distance in Ibadan corridor (Akobo to Dugbe)',
    passed: dist > 7 && dist < 12,
    details: `Distance: ${Math.round(dist * 100) / 100} km`,
  });

  // Test 2: PIN
  let pinValid = true;
  for (let i = 0; i < 50; i++) {
    const pin = generateTripPin();
    if (pin.length !== 4 || parseInt(pin, 10) < 1000 || parseInt(pin, 10) > 9999) {
      pinValid = false;
      break;
    }
  }
  tests.push({
    name: 'Trip PIN generation (4-digit range 1000-9999)',
    passed: pinValid,
    details: '50 random samples verified',
  });

  // Test 3: Pricing formula
  const shortTrip = calculateSuggestedContributionKobo(1.5, 3);
  tests.push({
    name: 'Pricing formula enforces minimum fare (₦250 / 25,000 kobo)',
    passed:
      shortTrip.perSeatKobo >= 25000 &&
      shortTrip.safetyReserveKobo === 5000 &&
      shortTrip.platformFeeKobo === Math.round(shortTrip.perSeatKobo * 0.1),
    details: `Fare: ₦${shortTrip.perSeatKobo / 100} | Reserve: ₦${shortTrip.safetyReserveKobo / 100}`,
  });

  // Test 4: Compatibility
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
  tests.push({
    name: 'Compatibility score differentiation (low detour vs high detour)',
    passed: highMatch > lowMatch && highMatch >= 80 && lowMatch < 50,
    details: `High match: ${highMatch} | Low match: ${lowMatch}`,
  });

  return tests;
}

if (typeof describe !== 'undefined') {
  describe('MOVE Matching and Spatial Algorithms', () => {
    test('Haversine distance calculates accurate distance in Ibadan', () => {
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
      const shortTrip = calculateSuggestedContributionKobo(1.5, 3);
      expect(shortTrip.perSeatKobo).toBeGreaterThanOrEqual(25000);
      expect(shortTrip.safetyReserveKobo).toBe(5000);
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
} else if (require.main === module) {
  console.log('⚡ Running weTag Matching & Spatial Algorithm Tests...\n');
  const results = runMatchingTests();
  console.table(results);
  const passed = results.filter((r) => r.passed).length;
  console.log(`\n🏁 Summary: ${passed}/${results.length} Algorithm Tests Passed.`);
  process.exit(passed === results.length ? 0 : 1);
}


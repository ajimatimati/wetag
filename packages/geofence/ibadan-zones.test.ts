const { isWithinIbadanServiceArea, IBADAN_SMART_HUBS } = require('./ibadan-zones');

declare const describe: any;
declare const test: any;
declare const expect: any;

export function runGeofenceTests() {
  const tests = [
    {
      name: 'UI Post Office inside service area',
      passed: isWithinIbadanServiceArea({ latitude: 7.444, longitude: 3.901 }) === true,
    },
    {
      name: 'Dugbe Cocoa House inside service area',
      passed: isWithinIbadanServiceArea({ latitude: 7.387, longitude: 3.878 }) === true,
    },
    {
      name: 'Akobo General Gas inside service area',
      passed: isWithinIbadanServiceArea({ latitude: 7.432, longitude: 3.935 }) === true,
    },
    {
      name: 'Lagos Ikeja rejected (outside boundary)',
      passed: isWithinIbadanServiceArea({ latitude: 6.601, longitude: 3.351 }) === false,
    },
    {
      name: 'Abuja CBD rejected (outside boundary)',
      passed: isWithinIbadanServiceArea({ latitude: 9.057, longitude: 7.495 }) === false,
    },
    {
      name: 'All registered Smart Hubs within boundary',
      passed: IBADAN_SMART_HUBS.every((hub: any) => isWithinIbadanServiceArea(hub.coordinates)),
    },
  ];
  return tests;
}

if (typeof describe !== 'undefined') {
  describe('Ibadan Geofencing & Smart Hub Registry', () => {
    test('Identifies core Ibadan coordinates as inside service area', () => {
      expect(isWithinIbadanServiceArea({ latitude: 7.444, longitude: 3.901 })).toBe(true);
      expect(isWithinIbadanServiceArea({ latitude: 7.387, longitude: 3.878 })).toBe(true);
      expect(isWithinIbadanServiceArea({ latitude: 7.432, longitude: 3.935 })).toBe(true);
    });

    test('Rejects coordinates outside Ibadan Phase 1 boundary', () => {
      expect(isWithinIbadanServiceArea({ latitude: 6.601, longitude: 3.351 })).toBe(false);
      expect(isWithinIbadanServiceArea({ latitude: 9.057, longitude: 7.495 })).toBe(false);
    });

    test('All registered Smart Hubs are strictly within service boundary', () => {
      for (const hub of IBADAN_SMART_HUBS) {
        expect(isWithinIbadanServiceArea(hub.coordinates)).toBe(true);
      }
    });
  });
} else if (require.main === module) {
  console.log('📍 Running Ibadan Geofencing & Smart Hub Validation Suite...\n');
  const results = runGeofenceTests();
  console.table(results);
  const passed = results.filter((r) => r.passed).length;
  console.log(`\n🏁 Summary: ${passed}/${results.length} Geofence Checks Passed.`);
  process.exit(passed === results.length ? 0 : 1);
}


import { isWithinIbadanServiceArea, IBADAN_SMART_HUBS } from './ibadan-zones';

describe('Ibadan Geofencing & Smart Hub Registry', () => {
  test('Identifies core Ibadan coordinates as inside service area', () => {
    // UI Post Office (7.444, 3.901)
    expect(isWithinIbadanServiceArea({ latitude: 7.444, longitude: 3.901 })).toBe(true);

    // Dugbe Cocoa House (7.387, 3.878)
    expect(isWithinIbadanServiceArea({ latitude: 7.387, longitude: 3.878 })).toBe(true);

    // Akobo General Gas (7.432, 3.935)
    expect(isWithinIbadanServiceArea({ latitude: 7.432, longitude: 3.935 })).toBe(true);
  });

  test('Rejects coordinates outside Ibadan Phase 1 boundary', () => {
    // Lagos Ikeja (6.601, 3.351)
    expect(isWithinIbadanServiceArea({ latitude: 6.601, longitude: 3.351 })).toBe(false);

    // Abuja CBD (9.057, 7.495)
    expect(isWithinIbadanServiceArea({ latitude: 9.057, longitude: 7.495 })).toBe(false);
  });

  test('All registered Smart Hubs are strictly within service boundary', () => {
    for (const hub of IBADAN_SMART_HUBS) {
      expect(isWithinIbadanServiceArea(hub.coordinates)).toBe(true);
    }
  });
});

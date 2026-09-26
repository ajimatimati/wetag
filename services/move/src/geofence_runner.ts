/**
 * weTag Ibadan Phase 1 Geofence & Smart Hub Verification Runner
 */

import { isWithinIbadanServiceArea, IBADAN_SMART_HUBS } from '../../../packages/geofence/ibadan-zones';

export interface GeofenceCheck {
  location: string;
  category: 'CORE_CORRIDOR' | 'BOUNDARY_REJECTION' | 'SMART_HUB';
  coordinates: string;
  expectedInside: boolean;
  actualInside: boolean;
  passed: boolean;
}

export function runGeofenceAudit(): GeofenceCheck[] {
  const checks: GeofenceCheck[] = [
    {
      location: 'UI Post Office (Agbowo)',
      category: 'CORE_CORRIDOR',
      coordinates: '7.444, 3.901',
      expectedInside: true,
      actualInside: isWithinIbadanServiceArea({ latitude: 7.444, longitude: 3.901 }),
      passed: false,
    },
    {
      location: 'Dugbe Commercial Hub (Cocoa House)',
      category: 'CORE_CORRIDOR',
      coordinates: '7.387, 3.878',
      expectedInside: true,
      actualInside: isWithinIbadanServiceArea({ latitude: 7.387, longitude: 3.878 }),
      passed: false,
    },
    {
      location: 'Akobo General Gas Hub',
      category: 'CORE_CORRIDOR',
      coordinates: '7.432, 3.935',
      expectedInside: true,
      actualInside: isWithinIbadanServiceArea({ latitude: 7.432, longitude: 3.935 }),
      passed: false,
    },
    {
      location: 'Old Bodija / Awolowo Avenue',
      category: 'CORE_CORRIDOR',
      coordinates: '7.428, 3.915',
      expectedInside: true,
      actualInside: isWithinIbadanServiceArea({ latitude: 7.428, longitude: 3.915 }),
      passed: false,
    },
    {
      location: 'Challenge Central Hub',
      category: 'CORE_CORRIDOR',
      coordinates: '7.348, 3.882',
      expectedInside: true,
      actualInside: isWithinIbadanServiceArea({ latitude: 7.348, longitude: 3.882 }),
      passed: false,
    },
    {
      location: 'Lagos Ikeja (Out of Bounds Check)',
      category: 'BOUNDARY_REJECTION',
      coordinates: '6.601, 3.351',
      expectedInside: false,
      actualInside: isWithinIbadanServiceArea({ latitude: 6.601, longitude: 3.351 }),
      passed: false,
    },
    {
      location: 'Abuja CBD (Out of Bounds Check)',
      category: 'BOUNDARY_REJECTION',
      coordinates: '9.057, 7.495',
      expectedInside: false,
      actualInside: isWithinIbadanServiceArea({ latitude: 9.057, longitude: 7.495 }),
      passed: false,
    },
  ];

  // Verify all registered hubs
  for (const hub of IBADAN_SMART_HUBS) {
    const inside = isWithinIbadanServiceArea(hub.coordinates);
    checks.push({
      location: `${hub.name} (${hub.neighborhood})`,
      category: 'SMART_HUB',
      coordinates: `${hub.coordinates.latitude}, ${hub.coordinates.longitude}`,
      expectedInside: true,
      actualInside: inside,
      passed: inside === true,
    });
  }

  for (const c of checks) {
    c.passed = c.actualInside === c.expectedInside;
  }

  return checks;
}

if (require.main === module) {
  console.log('Hub:  weTag Ibadan Phase 1 Geofence & Smart Hub Verification Runner:\n');
  const results = runGeofenceAudit();
  console.table(
    results.map((r) => ({
      Location: r.location,
      Category: r.category,
      Coordinates: r.coordinates,
      Result: r.actualInside ? 'INSIDE' : 'OUTSIDE',
      Status: r.passed ? 'PASSED' : 'FAILED',
    }))
  );
  const passedCount = results.filter((r) => r.passed).length;
  console.log(`\n Summary: ${passedCount}/${results.length} Geofence & Hub Validations Passed.`);
  process.exit(passedCount === results.length ? 0 : 1);
}

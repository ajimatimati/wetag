/**
 * weTag Ibadan Phase 1 Geofencing & Smart Pickup Hub Registry
 */

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface SmartHub {
  id: string;
  name: string;
  neighborhood: string;
  coordinates: GeoPoint;
  isPopularCorridorNode: boolean;
  landmark: string;
}

/**
 * Phase 1 Ibadan Operational Geofence Polygon (approximate bounding coordinates).
 */
export const IBADAN_PHASE_1_BOUNDARY: GeoPoint[] = [
  { latitude: 7.475, longitude: 3.885 }, // Ojoo / IITA North
  { latitude: 7.452, longitude: 3.965 }, // Akobo / Kolapo Ishola East
  { latitude: 7.395, longitude: 3.975 }, // Iwo Road / Monatan East
  { latitude: 7.335, longitude: 3.910 }, // Challenge / New Garage South
  { latitude: 7.350, longitude: 3.840 }, // Ring Road / Eleyele South-West
  { latitude: 7.430, longitude: 3.845 }, // Eleyele / Sango West
  { latitude: 7.475, longitude: 3.885 }, // Closing loop
];

/**
 * Smart Pickup Hub Registry across core Ibadan corridors.
 */
export const IBADAN_SMART_HUBS: SmartHub[] = [
  {
    id: 'hub_akobo_gas',
    name: 'Akobo General Gas Hub',
    neighborhood: 'Akobo',
    coordinates: { latitude: 7.432, longitude: 3.935 },
    isPopularCorridorNode: true,
    landmark: 'Opposite Total Filling Station, General Gas',
  },
  {
    id: 'hub_ui_post',
    name: 'UI Post Office Smart Hub',
    neighborhood: 'Agbowo / UI',
    coordinates: { latitude: 7.444, longitude: 3.901 },
    isPopularCorridorNode: true,
    landmark: 'Beside University of Ibadan Main Gate',
  },
  {
    id: 'hub_bodija_market',
    name: 'Old Bodija Hub',
    neighborhood: 'Bodija',
    coordinates: { latitude: 7.428, longitude: 3.915 },
    isPopularCorridorNode: true,
    landmark: 'Awolowo Avenue Junction, Bodija',
  },
  {
    id: 'hub_secretariat',
    name: 'Oyo State Secretariat Hub',
    neighborhood: 'Agodi',
    coordinates: { latitude: 7.408, longitude: 3.909 },
    isPopularCorridorNode: true,
    landmark: 'Governor Office Gate / Secretariat Roundabout',
  },
  {
    id: 'hub_dugbe_cocoa',
    name: 'Dugbe Commercial Hub',
    neighborhood: 'Dugbe',
    coordinates: { latitude: 7.387, longitude: 3.878 },
    isPopularCorridorNode: true,
    landmark: 'Cocoa House Main Entrance',
  },
  {
    id: 'hub_ringroad',
    name: 'Ring Road High Court Hub',
    neighborhood: 'Ring Road',
    coordinates: { latitude: 7.362, longitude: 3.865 },
    isPopularCorridorNode: true,
    landmark: 'Near Ibadan High Court Complex',
  },
  {
    id: 'hub_challenge',
    name: 'Challenge Central Hub',
    neighborhood: 'Challenge',
    coordinates: { latitude: 7.348, longitude: 3.882 },
    isPopularCorridorNode: true,
    landmark: 'Challenge Roundabout / Bus Terminus',
  },
];

/**
 * Checks if a given coordinate falls within the Phase 1 Ibadan Operational Geofence using ray-casting.
 */
export function isWithinIbadanServiceArea(point: GeoPoint): boolean {
  const vs = IBADAN_PHASE_1_BOUNDARY;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i].latitude;
    const yi = vs[i].longitude;
    const xj = vs[j].latitude;
    const yj = vs[j].longitude;

    const intersect =
      yi > point.longitude !== yj > point.longitude &&
      point.latitude < ((xj - xi) * (point.longitude - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

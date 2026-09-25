import { api } from './client';

export interface SearchRidesParams {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  departureTime?: string;
  seatsRequired?: number;
  maxRadiusKm?: number;
}

export interface MatchedJourneyResult {
  journey: {
    id: string;
    driverAccountId: string;
    originAddress: string;
    originLandmark?: string;
    destinationAddress: string;
    destinationLandmark?: string;
    totalSeats: number;
    availableSeats: number;
    departureWindow: string;
    suggestedContribution: number;
    maxDetourMinutes: number;
    status: string;
  };
  pickupDistanceKm: number;
  dropoffDistanceKm: number;
  estimatedDetourMins: number;
  compatibilityScore: number;
}

export const moveApi = {
  searchRides: (params: SearchRidesParams) =>
    api.post<{ results: MatchedJourneyResult[] }>('move', '/api/search/rides', params),

  createJourney: (journeyData: {
    vehicleId: string;
    originLat: number;
    originLng: number;
    originAddress: string;
    originLandmark?: string;
    destinationLat: number;
    destinationLng: number;
    destinationAddress: string;
    destinationLandmark?: string;
    routePolyline?: string;
    totalSeats: number;
    maxDetourMinutes?: number;
    departureWindow: string;
    departureWindowEnd?: string;
    suggestedContribution?: number;
  }) => api.post<{ journey: any }>('move', '/api/journeys', journeyData),

  getJourneyDetails: (journeyId: string) =>
    api.get<{ journey: any }>('move', `/api/journeys/${journeyId}`),

  reserveSeat: (journeyId: string, reservationData: {
    pickupLat: number;
    pickupLng: number;
    pickupAddress: string;
    pickupLandmark?: string;
    pickupType?: 'HUB' | 'DOOR' | 'CUSTOM';
    dropoffLat: number;
    dropoffLng: number;
    dropoffAddress: string;
    dropoffLandmark?: string;
    seatsBooked?: number;
    paymentMethod?: string;
  }) => api.post<{ reservation: any }>('move', `/api/journeys/${journeyId}/reserve`, reservationData),

  verifyPin: (reservationId: string, pin: string) =>
    api.patch<{ success: boolean; status: string }>('move', `/api/reservations/${reservationId}/verify-pin`, { pin }),

  completeTrip: (reservationId: string) =>
    api.patch<{ reservation: any }>('move', `/api/reservations/${reservationId}/complete`),

  saveRouteSubscription: (subscription: {
    role: 'RIDER' | 'DRIVER';
    originAddress: string;
    originLat: number;
    originLng: number;
    destinationAddress: string;
    destinationLat: number;
    destinationLng: number;
    daysOfWeek: number[];
    departureTime: string;
    departureWindowMins?: number;
    seatsOffered?: number;
  }) => api.post<{ subscription: any }>('move', '/api/routes', subscription),

  getMyRoutes: () => api.get<{ routes: any[] }>('move', '/api/routes/my'),

  rateTrip: (reservationId: string, score: number, comment?: string, tags: string[] = []) =>
    api.post<{ rating: any }>('move', `/api/reservations/${reservationId}/rate`, {
      score,
      comment,
      tags,
    }),
};

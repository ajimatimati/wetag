import { api } from './client';

export interface SearchListingsParams {
  neighborhood?: string;
  propertyType?: string;
  maxMoveInTotal?: number;
  minBedrooms?: number;
  furnishingStatus?: string;
  limit?: number;
  offset?: number;
}

export interface ListingDetail {
  id: string;
  propertyId: string;
  listerId: string;
  title: string;
  description?: string;
  photos: string[];
  videoTourUrl?: string;
  furnishingStatus: string;
  rentAmount: number;
  rentFrequency: string;
  agencyFee: number;
  legalFee: number;
  cautionDeposit: number;
  serviceCharge: number;
  otherFees: number;
  totalMoveInCost: number;
  status: string;
  property: {
    id: string;
    address: string;
    neighborhood: string;
    city: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    waterSource?: string;
    powerSetup?: string;
    meterType?: string;
    hasGenerator: boolean;
    generatorHours?: string;
    hasInverter: boolean;
    hasSolar: boolean;
    securityType?: string;
    parkingSpaces: number;
    isVerified: boolean;
  };
}

export const stayApi = {
  searchListings: (params: SearchListingsParams = {}) => {
    const query = new URLSearchParams();
    if (params.neighborhood) query.append('neighborhood', params.neighborhood);
    if (params.propertyType) query.append('propertyType', params.propertyType);
    if (params.maxMoveInTotal) query.append('maxMoveInTotal', params.maxMoveInTotal.toString());
    if (params.minBedrooms) query.append('minBedrooms', params.minBedrooms.toString());
    if (params.limit) query.append('limit', params.limit.toString());
    if (params.offset) query.append('offset', params.offset.toString());

    return api.get<{ results: ListingDetail[] }>('stay', `/api/listings/search?${query.toString()}`);
  },

  getListingDetails: (listingId: string) =>
    api.get<{ listing: ListingDetail }>('stay', `/api/listings/${listingId}`),

  bookViewing: (listingId: string, scheduledAt: string) =>
    api.post<{ viewing: any }>('stay', `/api/listings/${listingId}/viewings`, { scheduledAt }),

  checkInViewing: (viewingId: string) =>
    api.patch<{ viewing: any }>('stay', `/api/viewings/${viewingId}/check-in`),

  checkOutViewing: (viewingId: string) =>
    api.patch<{ viewing: any }>('stay', `/api/viewings/${viewingId}/check-out`),

  applyTenancy: (listingId: string, applicationData: {
    moveInDate?: string;
    proposedDuration?: number;
    numberOfOccupants?: number;
    employmentStatus?: string;
    guarantorName?: string;
    guarantorPhone?: string;
  }) => api.post<{ application: any }>('stay', `/api/listings/${listingId}/apply`, applicationData),

  createHousehold: (householdData: {
    propertyId: string;
    name?: string;
    totalRent: number;
    rentDueDay: number;
    members: Array<{
      accountId: string;
      rentSharePercent: number;
      role?: 'TENANT' | 'ORGANIZER' | 'LANDLORD';
    }>;
  }) => api.post<{ household: any }>('stay', '/api/households', householdData),

  getHouseholdLedger: (householdId: string) =>
    api.get<{ household: any }>('stay', `/api/households/${householdId}/ledger`),

  createSharedExpense: (householdId: string, expenseData: {
    description: string;
    amount: number;
    category: string;
    splitType?: 'EQUAL' | 'BY_RENT_SHARE' | 'CUSTOM';
    receiptUrl?: string;
  }) => api.post<{ expense: any }>('stay', `/api/households/${householdId}/expenses`, expenseData),
};

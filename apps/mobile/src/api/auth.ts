import { api } from './client';

export interface Account {
  id: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePhotoUrl?: string;
  riderProfile?: { rating: number; totalTrips: number };
  driverProfile?: { rating: number; totalJourneysShared: number; reliabilityScore: number; isApproved: boolean };
  tenantProfile?: { totalTenancies: number; disputeCount: number };
  landlordProfile?: { totalProperties: number; activeListings: number };
  agentProfile?: { agencyName?: string; isVerified: boolean };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  account: Account;
}

export const authApi = {
  requestOtp: (phoneNumber: string) =>
    api.post<{ message: string; expiresInSeconds: number }>('identity', '/api/auth/request-otp', {
      phoneNumber,
    }),

  verifyOtp: async (phoneNumber: string, code: string) => {
    const res = await api.post<AuthResponse>('identity', '/api/auth/verify-otp', {
      phoneNumber,
      code,
    });
    api.setToken(res.accessToken);
    return res;
  },

  getMe: () => api.get<{ account: Account }>('identity', '/api/account/me'),

  updateProfile: (profileData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    profilePhotoUrl?: string;
  }) => api.put<{ account: Account }>('identity', '/api/account/profile', profileData),

  upgradeToDriver: () =>
    api.post<{ driverProfile: any; message: string }>('identity', '/api/account/roles/driver'),

  setTenantPreferences: (preferences: any) =>
    api.post<{ tenantProfile: any }>('identity', '/api/account/roles/tenant', preferences),

  getTrustSummary: (accountId: string) =>
    api.get<{ trustSummary: any }>('identity', `/api/account/${accountId}/trust-summary`),

  addTrustedContact: (contact: {
    name: string;
    phoneNumber: string;
    relationship?: string;
    autoShareTrips?: boolean;
    autoShareViewings?: boolean;
  }) => api.post('identity', '/api/trusted-contacts', contact),
};

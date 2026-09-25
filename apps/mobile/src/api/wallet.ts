import { api } from './client';

export interface WalletInfo {
  id: string;
  accountId: string;
  availableBalance: number; // in kobo
  pendingBalance: number;
  currency: string;
}

export interface LedgerTransaction {
  id: string;
  walletId: string;
  type: string;
  direction: 'CREDIT' | 'DEBIT';
  amount: number;
  currency: string;
  domain: 'MOVE' | 'STAY' | 'PLATFORM';
  description: string;
  status: string;
  createdAt: string;
}

export const walletApi = {
  getWallet: () => api.get<{ wallet: WalletInfo }>('wallet', '/api/wallet'),

  getTransactions: (domain?: 'MOVE' | 'STAY' | 'PLATFORM', limit = 20, offset = 0) => {
    const query = new URLSearchParams();
    if (domain) query.append('domain', domain);
    query.append('limit', limit.toString());
    query.append('offset', offset.toString());

    return api.get<{ transactions: LedgerTransaction[] }>('wallet', `/api/wallet/transactions?${query.toString()}`);
  },

  topup: (amountKobo: number, provider: 'paystack' | 'flutterwave' = 'paystack') =>
    api.post<{ success: boolean; transaction: LedgerTransaction }>('wallet', '/api/wallet/topup', {
      amount: amountKobo,
      provider,
    }),

  requestPayout: (payoutData: {
    amount: number;
    bankName: string;
    accountNumber: string;
    accountName: string;
  }) => api.post<{ success: boolean; payout: any }>('wallet', '/api/wallet/payout', payoutData),

  createDispute: (disputeData: {
    againstAccountId?: string;
    domain: 'MOVE' | 'STAY' | 'PLATFORM';
    category: string;
    description: string;
    evidence?: string[];
    referenceType?: string;
    referenceId?: string;
  }) => api.post<{ dispute: any }>('wallet', '/api/disputes', disputeData),
};

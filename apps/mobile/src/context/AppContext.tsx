import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, walletApi, Account, WalletInfo } from '../api';

interface AppContextType {
  account: Account | null;
  wallet: WalletInfo | null;
  isLoading: boolean;
  activeRole: 'RIDER' | 'DRIVER' | 'TENANT' | 'LANDLORD';
  setActiveRole: (role: 'RIDER' | 'DRIVER' | 'TENANT' | 'LANDLORD') => void;
  refreshAccount: () => Promise<void>;
  refreshWallet: () => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [wallet, setWallet] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeRole, setActiveRole] = useState<'RIDER' | 'DRIVER' | 'TENANT' | 'LANDLORD'>('RIDER');

  const refreshAccount = async () => {
    try {
      const res = await authApi.getMe();
      setAccount(res.account);
    } catch (err) {
      console.log('[AppContext] No active session');
    }
  };

  const refreshWallet = async () => {
    try {
      const res = await walletApi.getWallet();
      setWallet(res.wallet);
    } catch (err) {
      console.log('[AppContext] Wallet lookup deferred');
    }
  };

  const logout = () => {
    setAccount(null);
    setWallet(null);
  };

  useEffect(() => {
    // Initial fetch on mount
    refreshAccount();
    refreshWallet();
  }, []);

  return (
    <AppContext.Provider
      value={{
        account,
        wallet,
        isLoading,
        activeRole,
        setActiveRole,
        refreshAccount,
        refreshWallet,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import React, { createContext, useContext, useState } from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  isVerified: boolean;
  tier: number;
}

export interface AppContextType {
  user: User;
  walletBalance: number;
  setWalletBalance: React.Dispatch<React.SetStateAction<number>>;
  activeTripId: string | null;
  setActiveTripId: (id: string | null) => void;
}

const defaultUser: User = {
  id: 'usr_tolu_01',
  name: 'Tolu Olaniyi',
  phone: '+234 803 ••• ••45',
  isVerified: true,
  tier: 2,
};

const AppContext = createContext<AppContextType>({
  user: defaultUser,
  walletBalance: 14500,
  setWalletBalance: () => {},
  activeTripId: null,
  setActiveTripId: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user] = useState<User>(defaultUser);
  const [walletBalance, setWalletBalance] = useState<number>(14500);
  const [activeTripId, setActiveTripId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        user,
        walletBalance,
        setWalletBalance,
        activeTripId,
        setActiveTripId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

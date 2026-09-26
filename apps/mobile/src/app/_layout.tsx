import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../context/AppContext';
import { LoaderScreen } from '../components/LoaderScreen';

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style={isReady ? 'dark' : 'light'} />
        {!isReady ? (
          <LoaderScreen onFinish={() => setIsReady(true)} />
        ) : (
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#F8FAFC' },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal/booking"
              options={{ presentation: 'modal', headerShown: false }}
            />
            <Stack.Screen
              name="modal/listing-detail"
              options={{ presentation: 'modal', headerShown: false }}
            />
            <Stack.Screen
              name="modal/household-expense"
              options={{ presentation: 'modal', headerShown: false }}
            />
            <Stack.Screen
              name="modal/auth-onboarding"
              options={{ presentation: 'modal', headerShown: false }}
            />
          </Stack>
        )}
      </AppProvider>
    </SafeAreaProvider>
  );
}

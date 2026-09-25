import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Compass, Building, MessageSquare, User } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDeep,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: colors.borderLight,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size ?? 22} />,
        }}
      />
      <Tabs.Screen
        name="move"
        options={{
          title: 'Move',
          tabBarActiveTintColor: colors.move.accentDeep,
          tabBarIcon: ({ color, size }) => <Compass color={color} size={size ?? 22} />,
        }}
      />
      <Tabs.Screen
        name="stay"
        options={{
          title: 'Stay',
          tabBarActiveTintColor: colors.stay.accentDeep,
          tabBarIcon: ({ color, size }) => <Building color={color} size={size ?? 22} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size ?? 22} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size ?? 22} />,
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { ShieldCheck, PhoneCall } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface SafetyPillProps {
  status?: 'ACTIVE' | 'STANDBY';
  onPress?: () => void;
}

export const SafetyPill: React.FC<SafetyPillProps> = ({ status = 'ACTIVE', onPress }) => {
  const handleEmergencyCall = () => {
    Alert.alert(
      'Oyo State 615 Safety Hotline',
      'Instant dispatch link to Oyo State Emergency Services (615) & weTag Rapid Safety Patrol.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call 615 Now',
          style: 'destructive',
          onPress: () => Linking.openURL('tel:615'),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress || handleEmergencyCall}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrap}>
        <ShieldCheck size={14} color={colors.primary} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Oyo 615 Civic Shield</Text>
        <Text style={styles.subtitle}>24/7 Verified Escrow & Patrol</Text>
      </View>
      <View style={styles.callBadge}>
        <PhoneCall size={12} color="#FFFFFF" />
        <Text style={styles.callBadgeText}>615</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 8,
  },
  iconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  subtitle: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  callBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryDeep,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  callBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});

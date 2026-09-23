import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface PinDisplayProps {
  pin: string;
}

export const PinDisplay: React.FC<PinDisplayProps> = ({ pin }) => {
  const digits = pin.split('').slice(0, 4);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>YOUR TRIP PIN</Text>
      <View style={styles.boxContainer}>
        {digits.map((digit, idx) => (
          <View key={idx} style={styles.digitBox}>
            <Text style={styles.digitText}>{digit}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.hint}>Show this 4-digit PIN to the driver at pickup.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.safety.pinBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDeep,
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  digitBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  digitText: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.safety.pin,
  },
  hint: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
});

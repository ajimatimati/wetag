import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface SafetyPillProps {
  onPressSOS?: () => void;
  onPressShare?: () => void;
}

export const SafetyPill: React.FC<SafetyPillProps> = ({ onPressSOS, onPressShare }) => {
  return (
    <View style={styles.pillContainer}>
      <TouchableOpacity
        style={styles.sosButton}
        onPress={onPressSOS}
        activeOpacity={0.8}
      >
        <ShieldAlert size={16} color="#FFFFFF" />
        <Text style={styles.sosText}>SOS / 615</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={onPressShare}
        activeOpacity={0.8}
      >
        <Text style={styles.shareText}>Share Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    padding: 4,
    shadowColor: '#172322',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.safety.sos,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
    gap: 6,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  shareButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  shareText: {
    color: colors.primaryDeep,
    fontWeight: '600',
    fontSize: 13,
  },
});

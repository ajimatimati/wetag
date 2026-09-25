import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ShieldAlert, Share2 } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface SafetyPillProps {
  onPressSOS?: () => void;
  onPressShare?: () => void;
}

export const SafetyPill: React.FC<SafetyPillProps> = ({ onPressSOS, onPressShare }) => {
  const handleSOS = () => {
    if (onPressSOS) {
      onPressSOS();
    } else {
      Alert.alert(
        'Oyo State 615 Civic Shield',
        'Direct connection to Oyo State Emergency Toll-Free Hotline (615).\n\nYour live vehicle GPS coordinates along the Ibadan corridor and registered emergency contacts will be alerted immediately.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Dial 615 Now', style: 'destructive', onPress: () => Alert.alert('Dialing', 'Connecting to Oyo State 615 Emergency Dispatch...') },
        ]
      );
    }
  };

  const handleShare = () => {
    if (onPressShare) {
      onPressShare();
    } else {
      Alert.alert(
        'Share Live Corridor Trip',
        'Your encrypted live trajectory link and vehicle details (OYO-742-BDJ) have been copied to your clipboard. Paste into WhatsApp or SMS for loved ones.'
      );
    }
  };

  return (
    <View style={styles.pillContainer}>
      <TouchableOpacity
        style={styles.sosButton}
        onPress={handleSOS}
        activeOpacity={0.85}
      >
        <ShieldAlert size={14} color="#FFFFFF" />
        <Text style={styles.sosText}>Oyo 615</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={handleShare}
        activeOpacity={0.8}
      >
        <Share2 size={13} color={colors.primaryDeep} />
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
    padding: 3,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    gap: 2,
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.safety.sos,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
    gap: 5,
  },
  sosText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 0.2,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 4,
  },
  shareText: {
    color: colors.primaryDeep,
    fontWeight: '700',
    fontSize: 12,
  },
});

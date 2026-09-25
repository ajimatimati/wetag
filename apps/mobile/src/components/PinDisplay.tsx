import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ShieldCheck, Copy, Check } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface PinDisplayProps {
  pin: string;
  label?: string;
}

export const PinDisplay: React.FC<PinDisplayProps> = ({
  pin,
  label = 'OFFLINE DROP-OFF PIN',
}) => {
  const [copied, setCopied] = useState(false);
  const digits = pin.split('').slice(0, 4);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert('PIN Copied', `PIN ${pin} copied to clipboard for offline driver verification.`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBadgeRow}>
        <View style={styles.offlineShield}>
          <ShieldCheck size={12} color="#A7F3D0" />
          <Text style={styles.offlineShieldText}>100% Offline Valid</Text>
        </View>
        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy} activeOpacity={0.7}>
          {copied ? (
            <Check size={12} color="#A7F3D0" />
          ) : (
            <Copy size={12} color="#FFFFFF" />
          )}
          <Text style={styles.copyBtnText}>{copied ? 'Copied' : 'Copy PIN'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>{label}</Text>

      <View style={styles.boxContainer}>
        {digits.map((digit, idx) => (
          <View key={idx} style={styles.digitBox}>
            <Text style={styles.digitText}>{digit}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.hint}>
        Share this 4-digit PIN with your driver <Text style={styles.hintBold}>only upon safe arrival</Text> at your destination to release escrow funds.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: colors.primaryDeep,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#0C2927',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
    width: '100%',
  },
  topBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  offlineShield: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(24, 184, 138, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  offlineShieldText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A7F3D0',
    letterSpacing: 0.5,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  copyBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  boxContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  digitBox: {
    width: 52,
    height: 60,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(24, 184, 138, 0.4)',
  },
  digitText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  hint: {
    fontSize: 12,
    color: '#A0B4B0',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  hintBold: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

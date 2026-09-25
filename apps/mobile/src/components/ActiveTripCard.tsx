import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import {
  ShieldCheck,
  PhoneCall,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  MapPin,
  Snowflake,
  Luggage,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

interface ActiveTripCardProps {
  pin?: string;
  driverName?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  etaMinutes?: number;
  origin?: string;
  destination?: string;
  hasAC?: boolean;
  luggageOk?: boolean;
  driverRating?: number;
  onCallDriver?: () => void;
  onSOS?: () => void;
}

export const ActiveTripCard: React.FC<ActiveTripCardProps> = ({
  pin = '4821',
  driverName = 'Babatunde A.',
  vehiclePlate = 'OYO-742-BDJ',
  vehicleModel = 'Toyota Corolla (Silver)',
  etaMinutes = 14,
  origin = 'Akobo General Gas',
  destination = 'Dugbe Cocoa House Hub',
  hasAC = true,
  luggageOk = true,
  driverRating = 4.9,
  onCallDriver,
  onSOS,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPin = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmergencySOS = () => {
    if (onSOS) {
      onSOS();
      return;
    }
    Alert.alert(
      '🚨 Connect to Oyo 615 Emergency Response?',
      `You are on an active trip from ${origin} to ${destination} in vehicle ${vehiclePlate}.\n\nThis will immediately connect you to Oyo State Citizens Emergency Hotline (615) and transmit your encrypted GPS telemetry.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Dial 615 Now',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Oyo 615 Dispatched',
              'Connecting directly to Oyo State Security Control Room. Telemetry packet sent.'
            );
          },
        },
      ]
    );
  };

  const handleShareTrajectory = async () => {
    try {
      await Share.share({
        message: `🛡️ I am riding with weTag on the ${origin} ➔ ${destination} corridor.\nVehicle: ${vehicleModel} (${vehiclePlate})\nDriver: ${driverName} (Smile ID NIN Verified)\nLive corridor trajectory: https://wetag.ng/move?tracking=active-${vehiclePlate.replace(/\s+/g, '')}`,
        title: 'weTag SafeCorridor™ Live Ride Tracking',
      });
    } catch {
      // User dismissed
    }
  };

  return (
    <View style={styles.card}>
      {/* Status Header */}
      <View style={styles.statusRow}>
        <View style={styles.liveIndicator}>
          <View style={styles.pulsingDot} />
          <Text style={styles.liveText}>In Transit · {etaMinutes} min remaining</Text>
        </View>
        <View style={styles.routePill}>
          <Text style={styles.routePillText}>SafeCorridor™</Text>
        </View>
      </View>

      {/* Corridor Header */}
      <View style={styles.corridorHeader}>
        <Text style={styles.destinationTitle}>Arriving at {destination}</Text>
        <View style={styles.originRow}>
          <MapPin size={12} color={colors.transitBlue} />
          <Text style={styles.originText}>Boarded at {origin}</Text>
        </View>
      </View>

      {/* 4-Digit Offline PIN Box */}
      <View style={styles.pinContainer}>
        <View style={styles.pinHeader}>
          <Text style={styles.pinLabel}>DROP-OFF AUTH PIN</Text>
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopyPin} activeOpacity={0.7}>
            {copied ? (
              <>
                <Check size={11} color={colors.primary} />
                <Text style={styles.copyBtnText}>Copied</Text>
              </>
            ) : (
              <>
                <Copy size={11} color="#A0B8B4" />
                <Text style={styles.copyBtnText}>Copy</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.pinDisplayRow}>
          {pin.split('').map((digit, i) => (
            <View key={i} style={styles.digitBox}>
              <Text style={styles.digitText}>{digit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.offlineRow}>
          <CheckCircle2 size={12} color={colors.primary} />
          <Text style={styles.offlineText}>
            100% Offline Valid · Keep secret until arrival
          </Text>
        </View>
      </View>

      {/* Driver & Vehicle Tile */}
      <View style={styles.driverRow}>
        <View style={styles.driverInfo}>
          <View style={styles.avatarBox}>
            <Text style={styles.avatarText}>{driverName.charAt(0)}</Text>
          </View>
          <View>
            <View style={styles.driverNameRow}>
              <Text style={styles.driverName}>{driverName}</Text>
              <View style={styles.verifiedChip}>
                <ShieldCheck size={11} color={colors.primary} />
                <Text style={styles.verifiedChipText}>NIN</Text>
              </View>
            </View>
            <Text style={styles.vehicleText}>{vehicleModel} · {vehiclePlate}</Text>
            <View style={styles.driverMetaRow}>
              <Text style={styles.ratingText}>★ {driverRating}</Text>
              <Text style={styles.metaDivider}>•</Text>
              {hasAC && (
                <View style={styles.comfortTag}>
                  <Snowflake size={10} color={colors.transitBlue} />
                  <Text style={styles.comfortTagText}>AC</Text>
                </View>
              )}
              {luggageOk && (
                <View style={styles.comfortTag}>
                  <Luggage size={10} color={colors.primaryDeep} />
                  <Text style={styles.comfortTagText}>Bags OK</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {onCallDriver && (
          <TouchableOpacity style={styles.callBtn} onPress={onCallDriver} activeOpacity={0.8}>
            <PhoneCall size={16} color={colors.primaryDeep} />
          </TouchableOpacity>
        )}
      </View>

      {/* Safety Actions */}
      <View style={styles.safetyRow}>
        <TouchableOpacity
          style={styles.shareBtn}
          onPress={handleShareTrajectory}
          activeOpacity={0.8}
        >
          <Share2 size={14} color={colors.primaryDeep} />
          <Text style={styles.shareBtnText}>Share Ride</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sosButton}
          onPress={handleEmergencySOS}
          activeOpacity={0.88}
        >
          <ShieldAlert size={14} color="#FFFFFF" />
          <Text style={styles.sosButtonText}>Oyo 615 SOS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  liveText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  routePill: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  routePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.move.transitBlue,
  },
  corridorHeader: {
    marginBottom: 16,
  },
  destinationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  originText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  pinContainer: {
    backgroundColor: colors.primaryDeep,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(24, 184, 138, 0.25)',
  },
  pinHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pinLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  copyBtnText: {
    fontSize: 10,
    color: '#D1DDD9',
    fontWeight: '600',
  },
  pinDisplayRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 12,
  },
  digitBox: {
    width: 52,
    height: 56,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(24, 184, 138, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  offlineText: {
    fontSize: 11,
    color: '#D1DDD9',
    fontWeight: '600',
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    marginBottom: 14,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatarBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  verifiedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  verifiedChipText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#2E7D32',
  },
  vehicleText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  driverMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
  metaDivider: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  comfortTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  comfortTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  callBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyRow: {
    flexDirection: 'row',
    gap: 10,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  shareBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  sosButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.safety.sos,
    paddingVertical: 11,
    borderRadius: 14,
    shadowColor: colors.safety.sos,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  sosButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

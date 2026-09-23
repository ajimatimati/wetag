import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldCheck, PhoneCall, ShieldAlert, CheckCircle2 } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface ActiveTripCardProps {
  pin?: string;
  driverName?: string;
  vehiclePlate?: string;
  vehicleModel?: string;
  etaMinutes?: number;
  origin?: string;
  destination?: string;
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
  onCallDriver,
  onSOS,
}) => {
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

      <Text style={styles.destinationTitle}>Arriving at {destination}</Text>

      {/* 4-Digit Offline PIN Box */}
      <View style={styles.pinContainer}>
        <View style={styles.pinHeader}>
          <Text style={styles.pinLabel}>DROP-OFF AUTH PIN</Text>
          <Text style={styles.pinHelp}>Share at drop-off</Text>
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
            Active trip cached offline · PIN valid without network
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
              <ShieldCheck size={14} color={colors.primary} />
            </View>
            <Text style={styles.vehicleText}>{vehicleModel} · {vehiclePlate}</Text>
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
        <TouchableOpacity style={styles.sosButton} onPress={onSOS} activeOpacity={0.88}>
          <ShieldAlert size={15} color="#FFFFFF" />
          <Text style={styles.sosButtonText}>Oyo 615 Response</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
    borderRadius: 6,
  },
  routePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.move.transitBlue,
  },
  destinationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  pinContainer: {
    backgroundColor: colors.primaryDeep,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  pinHelp: {
    fontSize: 11,
    color: '#A0B8B4',
    fontWeight: '500',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
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
    fontWeight: '500',
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
  },
  avatarBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  driverNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  vehicleText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  callBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.safety.sos,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
    width: '100%',
  },
  sosButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation, Clock, ShieldCheck } from 'lucide-react-native';
import { colors } from '../theme/colors';

export interface JourneyItem {
  id: string;
  driverName: string;
  driverRating: number;
  originAddress: string;
  destinationAddress: string;
  departureTime: string;
  availableSeats: number;
  perSeatNaira: number;
  estimatedDetourMins?: number;
  isVerified?: boolean;
  vehicleModel?: string;
  vehiclePlate?: string;
  hasLuggageSpace?: boolean;
  hasAc?: boolean;
  tripCount?: number;
}

interface JourneyCardProps {
  journey: JourneyItem;
  onSelect: (id: string) => void;
}

export const JourneyCard: React.FC<JourneyCardProps> = ({ journey, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(journey.id)}
      activeOpacity={0.88}
    >
      <View style={styles.topRow}>
        <View style={styles.driverInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{journey.driverName.charAt(0)}</Text>
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={styles.driverName}>{journey.driverName}</Text>
              {journey.isVerified && <ShieldCheck size={14} color={colors.primary} />}
            </View>
            <Text style={styles.ratingText}>
              ★ {journey.driverRating.toFixed(1)} {journey.tripCount ? `(${journey.tripCount} rides)` : '· Verified'} · Smile ID NIN
            </Text>
            {journey.vehicleModel && (
              <Text style={styles.vehicleText}>
                {journey.vehicleModel} {journey.vehiclePlate ? `· ${journey.vehiclePlate}` : ''}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceNaira}>₦{journey.perSeatNaira.toLocaleString()}</Text>
          <Text style={styles.priceSub}>per seat · flat</Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeCol}>
          <View style={[styles.dot, styles.originDot]} />
          <View style={styles.routeLine} />
          <View style={[styles.dot, styles.destDot]} />
        </View>
        <View style={styles.routeTextCol}>
          <Text style={styles.routeText} numberOfLines={1}>
            {journey.originAddress}
          </Text>
          <Text style={[styles.routeText, { marginTop: 10 }]} numberOfLines={1}>
            {journey.destinationAddress}
          </Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.pillGroup}>
          <View style={styles.badge}>
            <Clock size={12} color={colors.textSecondary} />
            <Text style={styles.badgeText}>{journey.departureTime}</Text>
          </View>
          <View style={[styles.badge, styles.seatBadge]}>
            <Text style={styles.seatBadgeText}>🪑 {journey.availableSeats} open</Text>
          </View>
          {journey.hasAc !== false && (
            <View style={[styles.badge, styles.comfortBadge]}>
              <Text style={styles.comfortBadgeText}>❄️ AC</Text>
            </View>
          )}
          {journey.hasLuggageSpace !== false && (
            <View style={[styles.badge, styles.comfortBadge]}>
              <Text style={styles.comfortBadgeText}>🧳 Bags OK</Text>
            </View>
          )}
          {journey.estimatedDetourMins !== undefined && (
            <View style={[styles.badge, styles.detourBadge]}>
              <Navigation size={11} color={colors.move.transitBlue} />
              <Text style={styles.detourText}>+{journey.estimatedDetourMins}m detour</Text>
            </View>
          )}
        </View>

        <View style={styles.bookActionPill}>
          <Text style={styles.bookActionText}>Join ➔</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
    marginTop: 1,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceNaira: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  priceSub: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  routeCol: {
    alignItems: 'center',
    width: 12,
    marginRight: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  originDot: {
    backgroundColor: colors.primaryDeep,
  },
  routeLine: {
    width: 2,
    height: 18,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  destDot: {
    backgroundColor: colors.move.transitBlue,
  },
  routeTextCol: {
    flex: 1,
  },
  routeText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  detourBadge: {
    backgroundColor: '#EFF6FF',
  },
  detourText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.move.transitBlue,
  },
  vehicleText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  bookActionPill: {
    backgroundColor: colors.primaryDeep,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  bookActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  seatBadge: {
    backgroundColor: '#EFF6FF',
  },
  seatBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.move.transitBlue,
  },
  comfortBadge: {
    backgroundColor: '#F3F4F6',
  },
  comfortBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});

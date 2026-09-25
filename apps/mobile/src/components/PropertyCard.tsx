import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ShieldCheck, Droplets, Zap, Shield, Car } from 'lucide-react-native';
import { colors } from '../theme/colors';

export interface PropertyItem {
  id: string;
  title: string;
  neighborhood: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  rentAnnualNaira: number;
  moveInTotalNaira: number;
  hasBorehole?: boolean;
  hasPrepaidMeter?: boolean;
  hasSecurity?: boolean;
  hasParking?: boolean;
  isVerified?: boolean;
  freshnessText?: string;
  commuteMinutesSecretariat?: number;
  commuteMinutesUi?: number;
  flatmateMonthlyNaira?: number;
}

interface PropertyCardProps {
  property: PropertyItem;
  onSelect: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(property.id)}
      activeOpacity={0.88}
    >
      {/* Property Thumbnail with Badges */}
      <View style={styles.imageBox}>
        <View style={styles.badgeRow}>
          {property.isVerified && (
            <View style={styles.verifiedBadge}>
              <ShieldCheck size={12} color="#FFFFFF" />
              <Text style={styles.verifiedText}>Civic Verified Landlord</Text>
            </View>
          )}
          <View style={styles.zeroFeeBadge}>
            <Text style={styles.zeroFeeText}>Zero Surprise Fees</Text>
          </View>
        </View>
        <View style={styles.thumbBottomRow}>
          <Text style={styles.imagePlaceholderText}>
            {property.bedrooms} Bed · {property.propertyType}
          </Text>
          <View style={styles.pHashBadge}>
            <Text style={styles.pHashText}>🛡️ pHash Scam-Free</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.neighborhoodRow}>
          <Text style={styles.neighborhood}>{property.neighborhood}, Ibadan</Text>
          {property.commuteMinutesSecretariat !== undefined && (
            <View style={styles.commutePill}>
              <Text style={styles.commuteText}>
                🚗 {property.commuteMinutesSecretariat}m to Secretariat
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>

        {/* Real Move-In Cost Box */}
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.moveInLabel}>REAL MOVE-IN TOTAL (UPFRONT)</Text>
            <Text style={styles.moveInPrice}>
              ₦{property.moveInTotalNaira.toLocaleString()}
            </Text>
          </View>
          <View style={styles.rentBlock}>
            <Text style={styles.rentLabel}>Base Rent</Text>
            <Text style={styles.rentPrice}>
              ₦{property.rentAnnualNaira.toLocaleString()}/yr
            </Text>
          </View>
        </View>

        {/* Itemized Guarantee Hint */}
        <Text style={styles.guaranteeSubtext} numberOfLines={1}>
          Guaranteed upfront: Rent + Capped 10% Agency + Legal + Refundable Caution
        </Text>

        {/* Utility Badges */}
        <View style={styles.amenitiesRow}>
          {property.hasBorehole && (
            <View style={styles.amenityChip}>
              <Droplets size={11} color={colors.primaryDeep} />
              <Text style={styles.amenityText}>24/7 Borehole</Text>
            </View>
          )}
          {property.hasPrepaidMeter && (
            <View style={styles.amenityChip}>
              <Zap size={11} color="#D97706" />
              <Text style={styles.amenityText}>Prepaid Band B</Text>
            </View>
          )}
          {property.hasSecurity && (
            <View style={styles.amenityChip}>
              <Shield size={11} color={colors.stay.accentDeep} />
              <Text style={styles.amenityText}>Gated Estate</Text>
            </View>
          )}
          {property.hasParking && (
            <View style={styles.amenityChip}>
              <Car size={11} color={colors.textSecondary} />
              <Text style={styles.amenityText}>Parking</Text>
            </View>
          )}
        </View>

        {/* Flatmate Co-Living Option */}
        <View style={styles.cardFooter}>
          <Text style={styles.flatmateText} numberOfLines={1}>
            Co-living split: <Text style={styles.flatmateBold}>~₦{(property.flatmateMonthlyNaira || Math.round(property.rentAnnualNaira / 12 / (property.bedrooms || 2))).toLocaleString()}/mo</Text> per flatmate
          </Text>
          <View style={styles.viewActionPill}>
            <Text style={styles.viewActionText}>View Details ➔</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  imageBox: {
    height: 140,
    backgroundColor: '#1E3A38',
    padding: 12,
    justifyContent: 'space-between',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  zeroFeeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  zeroFeeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  imagePlaceholderText: {
    color: '#D1DDD9',
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    padding: 16,
  },
  neighborhood: {
    fontSize: 11,
    color: colors.stay.warmClay,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  moveInLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: 0.5,
  },
  moveInPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primaryDeep,
    marginTop: 1,
  },
  rentBlock: {
    alignItems: 'flex-end',
  },
  rentLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  rentPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 1,
  },
  guaranteeSubtext: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 12,
    fontWeight: '500',
  },
  amenitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  thumbBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pHashBadge: {
    backgroundColor: 'rgba(18, 60, 58, 0.75)',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 6,
  },
  pHashText: {
    color: '#A7F3D0',
    fontSize: 9,
    fontWeight: '700',
  },
  neighborhoodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commutePill: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 6,
  },
  commuteText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.move.transitBlue,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  flatmateText: {
    fontSize: 11,
    color: colors.textSecondary,
    flex: 1,
    marginRight: 8,
  },
  flatmateBold: {
    fontWeight: '800',
    color: colors.stay.warmClay,
  },
  viewActionPill: {
    backgroundColor: colors.primaryDeep,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
  },
  viewActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

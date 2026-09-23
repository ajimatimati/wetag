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
              <Text style={styles.verifiedText}>Verified Landlord</Text>
            </View>
          )}
          <View style={styles.zeroFeeBadge}>
            <Text style={styles.zeroFeeText}>Zero surprise fee</Text>
          </View>
        </View>
        <Text style={styles.imagePlaceholderText}>
          {property.bedrooms} Bed · {property.propertyType}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.neighborhood}>{property.neighborhood}, Ibadan</Text>
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>

        {/* Real Move-In Cost Box */}
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.moveInLabel}>REAL MOVE-IN TOTAL</Text>
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
          Includes rent + standard capped 10% agency + legal + caution
        </Text>

        {/* Utility Badges */}
        <View style={styles.amenitiesRow}>
          {property.hasBorehole && (
            <View style={styles.amenityChip}>
              <Droplets size={11} color={colors.primaryDeep} />
              <Text style={styles.amenityText}>Borehole 24/7</Text>
            </View>
          )}
          {property.hasPrepaidMeter && (
            <View style={styles.amenityChip}>
              <Zap size={11} color="#D97706" />
              <Text style={styles.amenityText}>Prepaid Meter</Text>
            </View>
          )}
          {property.hasSecurity && (
            <View style={styles.amenityChip}>
              <Shield size={11} color={colors.stay.accentDeep} />
              <Text style={styles.amenityText}>Gated Security</Text>
            </View>
          )}
          {property.hasParking && (
            <View style={styles.amenityChip}>
              <Car size={11} color={colors.textSecondary} />
              <Text style={styles.amenityText}>Parking</Text>
            </View>
          )}
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
  amenityText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});

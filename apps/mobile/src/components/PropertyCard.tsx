import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  ShieldCheck,
  Droplets,
  Zap,
  Shield,
  Car,
  Heart,
  Star,
  Bed,
  Bath,
  Maximize2,
} from 'lucide-react-native';
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
  imageUrl?: string;
  squareFeet?: number;
  starRating?: number;
  reviewCount?: number;
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

const DEFAULT_PROPERTY_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const imageUri = property.imageUrl || DEFAULT_PROPERTY_IMAGE;
  const rating = property.starRating || 4.9;
  const reviews = property.reviewCount || 38;
  const sqft = property.squareFeet || property.bedrooms * 620;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onSelect(property.id)}
      activeOpacity={0.92}
    >
      {/* Edge-to-Edge Architectural Photography with Homeluxe Badges */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Top Badges Row */}
        <View style={styles.topBadgeRow}>
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>

          <TouchableOpacity
            style={[styles.favoriteButton, isFavorited && styles.favoriteActive]}
            onPress={(e) => {
              e.stopPropagation();
              setIsFavorited(!isFavorited);
            }}
            activeOpacity={0.8}
          >
            <Heart
              size={15}
              color={isFavorited ? '#EF4444' : '#FFFFFF'}
              fill={isFavorited ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Bottom Scrim Row */}
        <View style={styles.bottomScrimRow}>
          <View style={styles.verificationPill}>
            <ShieldCheck size={11} color="#00D47E" />
            <Text style={styles.verificationText}>
              {property.isVerified ? 'Civic Verified Landlord' : 'Verified Listing'}
            </Text>
          </View>

          <View style={styles.photoCountPill}>
            <Text style={styles.photoCountText}>1/18 Photos</Text>
          </View>
        </View>
      </View>

      {/* Property Details Body */}
      <View style={styles.body}>
        {/* Location & Star Rating */}
        <View style={styles.metaRow}>
          <Text style={styles.neighborhood}>
            {property.neighborhood}, Ibadan
          </Text>
          <View style={styles.ratingBadge}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>
              {rating} <Text style={styles.reviewText}>({reviews})</Text>
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>
          {property.title}
        </Text>

        {/* Homeluxe-Grade 4-Column Spec Tray */}
        <View style={styles.specTray}>
          <View style={styles.specTile}>
            <Bed size={14} color="#64748B" />
            <Text style={styles.specValue}>{property.bedrooms} Beds</Text>
          </View>
          <View style={styles.specTile}>
            <Bath size={14} color="#64748B" />
            <Text style={styles.specValue}>{property.bathrooms} Baths</Text>
          </View>
          <View style={styles.specTile}>
            <Maximize2 size={14} color="#64748B" />
            <Text style={styles.specValue}>{sqft.toLocaleString()} sqft</Text>
          </View>
          <View style={styles.specTile}>
            <Droplets size={14} color="#00D47E" />
            <Text style={styles.specValue}>Borehole</Text>
          </View>
        </View>

        {/* OpenRent Real Move-In Price Container */}
        <View style={styles.priceContainer}>
          <View>
            <View style={styles.moveInLabelRow}>
              <Text style={styles.moveInLabel}>REAL MOVE-IN TOTAL (UPFRONT)</Text>
              <View style={styles.zeroSurprisePill}>
                <Text style={styles.zeroSurpriseText}>Zero Surprise Fees</Text>
              </View>
            </View>
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

        {/* Commute Duration & Itemized Guarantee */}
        <View style={styles.commuteRow}>
          {property.commuteMinutesSecretariat !== undefined && (
            <View style={styles.commutePill}>
              <Text style={styles.commuteText}>
                🚗 {property.commuteMinutesSecretariat}m to Secretariat
              </Text>
            </View>
          )}
          <View style={styles.pHashBadge}>
            <Text style={styles.pHashText}>🛡️ pHash Scam-Free</Text>
          </View>
        </View>

        {/* Card Footer: Co-living Split + CTA */}
        <View style={styles.cardFooter}>
          <Text style={styles.flatmateText} numberOfLines={1}>
            Co-living split:{' '}
            <Text style={styles.flatmateBold}>
              ~₦{(property.flatmateMonthlyNaira || Math.round(property.rentAnnualNaira / 12 / (property.bedrooms || 2))).toLocaleString()}/mo
            </Text>
          </Text>
          <View style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Book a Visit ➔</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
  imageContainer: {
    height: 190,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0A0D16',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  topBadgeRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  featuredBadge: {
    backgroundColor: 'rgba(10, 13, 22, 0.72)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  favoriteButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(10, 13, 22, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  favoriteActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#EF4444',
  },
  bottomScrimRow: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  verificationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(10, 13, 22, 0.78)',
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 126, 0.3)',
  },
  verificationText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  photoCountPill: {
    backgroundColor: 'rgba(10, 13, 22, 0.65)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  photoCountText: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '700',
  },
  body: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  neighborhood: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A0D16',
  },
  reviewText: {
    color: '#94A3B8',
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0A0D16',
    letterSpacing: -0.2,
    marginBottom: 14,
  },
  specTray: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  specTile: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    gap: 4,
  },
  specValue: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  moveInLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  moveInLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0A0D16',
    letterSpacing: 0.4,
  },
  zeroSurprisePill: {
    backgroundColor: '#E6FAF2',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  zeroSurpriseText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00D47E',
  },
  moveInPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0A0D16',
    letterSpacing: -0.3,
  },
  rentBlock: {
    alignItems: 'flex-end',
  },
  rentLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
  },
  rentPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginTop: 1,
  },
  commuteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  commutePill: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  commuteText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  pHashBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  pHashText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  flatmateText: {
    fontSize: 11,
    color: '#64748B',
    flex: 1,
    marginRight: 8,
  },
  flatmateBold: {
    fontWeight: '800',
    color: '#0A0D16',
  },
  ctaButton: {
    backgroundColor: '#0A0D16',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  ctaButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

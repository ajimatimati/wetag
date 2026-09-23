import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, SlidersHorizontal, ShieldCheck } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { PropertyCard, PropertyItem } from '../../components/PropertyCard';

const SAMPLE_PROPERTIES: PropertyItem[] = [
  {
    id: '1',
    title: 'Spacious 2-Bedroom Flat in Bodija Estate',
    neighborhood: 'Old Bodija',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    rentAnnualNaira: 700000,
    moveInTotalNaira: 890000,
    hasBorehole: true,
    hasPrepaidMeter: true,
    hasSecurity: true,
    hasParking: true,
    isVerified: true,
    freshnessText: 'Confirmed Today',
  },
  {
    id: '2',
    title: 'Serviced Self-Contain close to UI Main Gate',
    neighborhood: 'Agbowo / UI',
    propertyType: 'Self Contain',
    bedrooms: 1,
    bathrooms: 1,
    rentAnnualNaira: 350000,
    moveInTotalNaira: 460000,
    hasBorehole: true,
    hasPrepaidMeter: true,
    hasSecurity: true,
    hasParking: false,
    isVerified: true,
    freshnessText: 'Confirmed Yesterday',
  },
  {
    id: '3',
    title: 'Modern 3-Bedroom Shared Apartment for Corpers',
    neighborhood: 'Samonda / Sango',
    propertyType: 'Shared Flat',
    bedrooms: 3,
    bathrooms: 3,
    rentAnnualNaira: 1200000,
    moveInTotalNaira: 1450000,
    hasBorehole: true,
    hasPrepaidMeter: true,
    hasSecurity: true,
    hasParking: true,
    isVerified: true,
    freshnessText: 'Verified Inspection',
  },
];

export default function StayScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BODIJA' | 'UI' | 'AKOBO' | 'NYSC'>('ALL');

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Header */}
        <View style={styles.header}>
          <Text style={styles.title}>STAY</Text>
          <Text style={styles.subtitle}>Verified Homes & Co-Living in Ibadan</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search size={18} color={colors.stay.warmClay} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search neighborhood (Bodija, UI, Akobo...)"
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <SlidersHorizontal size={16} color={colors.primaryDeep} />
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContainer}
        >
          {[
            { id: 'ALL', label: 'All Listings' },
            { id: 'BODIJA', label: 'Bodija' },
            { id: 'UI', label: 'UI Agbowo' },
            { id: 'AKOBO', label: 'Akobo' },
            { id: 'NYSC', label: 'NYSC Settle-In' },
          ].map((pill) => (
            <TouchableOpacity
              key={pill.id}
              style={[styles.pill, activeFilter === pill.id && styles.activePill]}
              onPress={() => setActiveFilter(pill.id as any)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, activeFilter === pill.id && styles.activePillText]}>
                {pill.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Radical Transparency Guarantee Banner */}
        <View style={styles.guaranteeBanner}>
          <ShieldCheck size={18} color={colors.primary} />
          <View style={styles.guaranteeContent}>
            <Text style={styles.guaranteeTitle}>No Total Package Surprises</Text>
            <Text style={styles.guaranteeBody}>
              Every home displays the complete move-in cost upfront (Rent + Capped Agency + Legal + Caution).
            </Text>
          </View>
        </View>

        {/* Verified Homes Feed */}
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Verified Ibadan Homes</Text>
          <Text style={styles.feedCount}>{SAMPLE_PROPERTIES.length} available</Text>
        </View>

        {SAMPLE_PROPERTIES.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={() => router.push('/modal/listing-detail')}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FAF8',
  },
  scrollContent: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.primaryDeep,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 14,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    marginLeft: 10,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    paddingVertical: 2,
  },
  pill: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  activePill: {
    backgroundColor: colors.primaryDeep,
    borderColor: colors.primaryDeep,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activePillText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  guaranteeBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 20,
  },
  guaranteeContent: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginBottom: 2,
  },
  guaranteeBody: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  feedTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  feedCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
});

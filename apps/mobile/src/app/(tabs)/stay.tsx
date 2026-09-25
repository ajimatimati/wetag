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
    commuteMinutesSecretariat: 6,
    commuteMinutesUi: 11,
    flatmateMonthlyNaira: 29167,
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
    commuteMinutesSecretariat: 14,
    commuteMinutesUi: 3,
    flatmateMonthlyNaira: 38333,
  },
  {
    id: '3',
    title: 'Modern 3-Bedroom Shared Flat for Corpers',
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
    commuteMinutesSecretariat: 9,
    commuteMinutesUi: 7,
    flatmateMonthlyNaira: 33333,
  },
  {
    id: '4',
    title: 'Premium 2-Bed Flat along Akobo Axis',
    neighborhood: 'Akobo Ojurin',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    rentAnnualNaira: 650000,
    moveInTotalNaira: 820000,
    hasBorehole: true,
    hasPrepaidMeter: true,
    hasSecurity: true,
    hasParking: true,
    isVerified: true,
    freshnessText: 'Confirmed Today',
    commuteMinutesSecretariat: 18,
    commuteMinutesUi: 22,
    flatmateMonthlyNaira: 27083,
  },
];

export default function StayScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BODIJA' | 'UI' | 'AKOBO' | 'NYSC'>('ALL');
  const [commuteFilter, setCommuteFilter] = useState<'ANY' | 'SECRETARIAT' | 'UI'>('ANY');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = SAMPLE_PROPERTIES.filter((p) => {
    if (activeFilter === 'BODIJA' && !p.neighborhood.includes('Bodija')) return false;
    if (activeFilter === 'UI' && !p.neighborhood.includes('UI') && !p.neighborhood.includes('Agbowo')) return false;
    if (activeFilter === 'AKOBO' && !p.neighborhood.includes('Akobo')) return false;
    if (activeFilter === 'NYSC' && !p.neighborhood.includes('Samonda')) return false;

    if (commuteFilter === 'SECRETARIAT' && (p.commuteMinutesSecretariat || 99) > 12) return false;
    if (commuteFilter === 'UI' && (p.commuteMinutesUi || 99) > 10) return false;

    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q);
    }

    return true;
  });

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
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <SlidersHorizontal size={16} color={colors.primaryDeep} />
          </TouchableOpacity>
        </View>

        {/* District Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pillsContainer}
        >
          {[
            { id: 'ALL', label: 'All Listings' },
            { id: 'BODIJA', label: 'Old Bodija' },
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

        {/* Commute Corridor Filter Row */}
        <View style={styles.commuteFilterRow}>
          <TouchableOpacity
            style={[styles.commuteBtn, commuteFilter === 'ANY' && styles.commuteBtnActive]}
            onPress={() => setCommuteFilter('ANY')}
          >
            <Text style={[styles.commuteBtnText, commuteFilter === 'ANY' && styles.commuteBtnTextActive]}>
              All Commutes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.commuteBtn, commuteFilter === 'SECRETARIAT' && styles.commuteBtnActive]}
            onPress={() => setCommuteFilter('SECRETARIAT')}
          >
            <Text style={[styles.commuteBtnText, commuteFilter === 'SECRETARIAT' && styles.commuteBtnTextActive]}>
              🚗 &lt;15m Secretariat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.commuteBtn, commuteFilter === 'UI' && styles.commuteBtnActive]}
            onPress={() => setCommuteFilter('UI')}
          >
            <Text style={[styles.commuteBtnText, commuteFilter === 'UI' && styles.commuteBtnTextActive]}>
              🎓 &lt;10m UI Gate
            </Text>
          </TouchableOpacity>
        </View>

        {/* Radical Transparency Guarantee Banner */}
        <View style={styles.guaranteeBanner}>
          <ShieldCheck size={18} color={colors.primary} />
          <View style={styles.guaranteeContent}>
            <Text style={styles.guaranteeTitle}>No Total Package Surprises</Text>
            <Text style={styles.guaranteeBody}>
              Every home displays the complete move-in cost upfront (Rent + Capped 10% Agency + Legal + Refundable Caution). Zero inspection extortion.
            </Text>
          </View>
        </View>

        {/* Verified Homes Feed */}
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Verified Ibadan Homes</Text>
          <Text style={styles.feedCount}>{filteredProperties.length} available</Text>
        </View>

        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={() =>
              router.push({
                pathname: '/modal/listing-detail',
                params: {
                  id: property.id,
                  title: property.title,
                  neighborhood: property.neighborhood,
                  rentAmount: (property.rentAnnualNaira * 100).toString(),
                  agencyFee: ((property.rentAnnualNaira * 0.1) * 100).toString(),
                  legalFee: ((property.rentAnnualNaira * 0.1) * 100).toString(),
                  cautionDeposit: '5000000',
                  serviceCharge: '0',
                  totalMoveInCost: (property.moveInTotalNaira * 100).toString(),
                  propertyType: property.propertyType,
                },
              })
            }
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
  commuteFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  commuteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  commuteBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: colors.move.transitBlue,
  },
  commuteBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  commuteBtnTextActive: {
    color: colors.move.transitBlue,
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

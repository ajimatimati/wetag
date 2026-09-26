import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Building,
  GraduationCap,
  Key,
  Home,
  Star,
  MapPin,
} from 'lucide-react-native';
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
    squareFeet: 1450,
    starRating: 4.9,
    reviewCount: 42,
    rentAnnualNaira: 700000,
    moveInTotalNaira: 890000,
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
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
    squareFeet: 550,
    starRating: 4.8,
    reviewCount: 29,
    rentAnnualNaira: 350000,
    moveInTotalNaira: 460000,
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
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
    squareFeet: 2100,
    starRating: 4.9,
    reviewCount: 56,
    rentAnnualNaira: 1200000,
    moveInTotalNaira: 1450000,
    imageUrl:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
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
    squareFeet: 1350,
    starRating: 4.7,
    reviewCount: 31,
    rentAnnualNaira: 650000,
    moveInTotalNaira: 820000,
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
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

const POPULAR_LOCATIONS = [
  {
    id: '1',
    name: 'Old Bodija',
    sub: 'Civil Servants & Executives',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'UI Agbowo',
    sub: 'Campus & Postgrads',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Akobo Gas',
    sub: 'Emerging Modern Hub',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Ring Road',
    sub: 'Commercial & High Court',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
  },
];

export default function StayScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'STUDENT' | 'SERVICED' | 'DIRECT'>('ALL');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BODIJA' | 'UI' | 'AKOBO' | 'NYSC'>('ALL');
  const [commuteFilter, setCommuteFilter] = useState<'ANY' | 'SECRETARIAT' | 'UI'>('ANY');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = SAMPLE_PROPERTIES.filter((p) => {
    if (selectedCategory === 'STUDENT' && !p.neighborhood.includes('UI') && !p.neighborhood.includes('Agbowo') && p.propertyType !== 'Self Contain') return false;
    if (selectedCategory === 'SERVICED' && p.propertyType !== 'Apartment' && p.propertyType !== 'Shared Flat') return false;

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
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Homeluxe-Grade Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Hi, Ibadan Resident! </Text>
            <Text style={styles.title}>Find Your Perfect Place</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Scam-Proof</Text>
          </View>
        </View>

        {/* Search Bar Pill */}
        <View style={styles.searchBar}>
          <Search size={18} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Bodija, UI Agbowo, Akobo..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.8}>
            <SlidersHorizontal size={16} color="#0A0D16" />
          </TouchableOpacity>
        </View>

        {/* Homeluxe 4-Category Grid Tiles */}
        <View style={styles.categoryGrid}>
          {[
            { id: 'ALL', label: 'All Homes', icon: Home },
            { id: 'STUDENT', label: 'Student UI', icon: GraduationCap },
            { id: 'SERVICED', label: 'Serviced Flats', icon: Building },
            { id: 'DIRECT', label: 'Direct Landlord', icon: Key },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryTile, isActive && styles.categoryTileActive]}
                onPress={() => setSelectedCategory(cat.id as any)}
                activeOpacity={0.85}
              >
                <View style={[styles.categoryIconCircle, isActive && styles.categoryIconCircleActive]}>
                  <Icon size={18} color={isActive ? '#FFFFFF' : '#0A0D16'} />
                </View>
                <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Popular Locations in Ibadan (Homeluxe Carousel) */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Neighborhoods</Text>
          <Text style={styles.sectionLink}>Ibadan Axis</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.locationsScroll}
        >
          {POPULAR_LOCATIONS.map((loc) => (
            <TouchableOpacity
              key={loc.id}
              style={styles.locationCard}
              onPress={() => setSearchQuery(loc.name)}
              activeOpacity={0.9}
            >
              <Image source={{ uri: loc.image }} style={styles.locationImage} />
              <View style={styles.locationOverlay}>
                <Text style={styles.locationName}>{loc.name}</Text>
                <Text style={styles.locationSub}>{loc.sub}</Text>
              </View>
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
               &lt;15m Secretariat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.commuteBtn, commuteFilter === 'UI' && styles.commuteBtnActive]}
            onPress={() => setCommuteFilter('UI')}
          >
            <Text style={[styles.commuteBtnText, commuteFilter === 'UI' && styles.commuteBtnTextActive]}>
              Campus  &lt;10m UI Gate
            </Text>
          </TouchableOpacity>
        </View>

        {/* OpenRent Radical Transparency Guarantee Banner */}
        <View style={styles.guaranteeBanner}>
          <ShieldCheck size={20} color="#00D47E" />
          <View style={styles.guaranteeContent}>
            <Text style={styles.guaranteeTitle}>No Total Package Surprises</Text>
            <Text style={styles.guaranteeBody}>
              Every home displays the complete move-in cost upfront (Rent + Capped 10% Agency + Legal + Refundable Caution). Zero hidden fees.
            </Text>
          </View>
        </View>

        {/* List Property Action Banner */}
        <TouchableOpacity
          style={styles.listerBanner}
          onPress={() => router.push('/modal/auth-onboarding')}
          activeOpacity={0.88}
        >
          <View style={styles.listerBannerContent}>
            <Text style={styles.listerBannerTitle}>Are you a Landlord or Moving Out?</Text>
            <Text style={styles.listerBannerSub}>
              List your property or transfer your lease with verified scam-free escrow protection.
            </Text>
          </View>
          <View style={styles.listerBannerBtn}>
            <Text style={styles.listerBannerBtnText}>+ List Home </Text>
          </View>
        </TouchableOpacity>

        {/* Verified Homes Feed */}
        <View style={styles.feedHeader}>
          <Text style={styles.feedTitle}>Featured Verified Listings</Text>
          <Text style={styles.feedCount}>{filteredProperties.length} homes available</Text>
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 6,
  },
  greetingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0A0D16',
    letterSpacing: -0.4,
  },
  headerBadge: {
    backgroundColor: '#E6FAF2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  headerBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00D47E',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#0A0D16',
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  categoryTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  categoryTileActive: {
    backgroundColor: '#0A0D16',
    borderColor: '#0A0D16',
  },
  categoryIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryIconCircleActive: {
    backgroundColor: '#1E293B',
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#334155',
  },
  categoryLabelActive: {
    color: '#FFFFFF',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0A0D16',
  },
  sectionLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  locationsScroll: {
    gap: 12,
    paddingBottom: 4,
    marginBottom: 20,
  },
  locationCard: {
    width: 140,
    height: 110,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0A0D16',
  },
  locationImage: {
    width: '100%',
    height: '100%',
  },
  locationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(10, 13, 22, 0.72)',
  },
  locationName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  locationSub: {
    fontSize: 8,
    fontWeight: '600',
    color: '#CBD5E1',
    marginTop: 1,
  },
  commuteFilterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  commuteBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  commuteBtnActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  commuteBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  commuteBtnTextActive: {
    color: '#2563EB',
    fontWeight: '800',
  },
  guaranteeBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  guaranteeContent: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0A0D16',
    marginBottom: 2,
  },
  guaranteeBody: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
  },
  listerBanner: {
    backgroundColor: '#0A0D16',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  listerBannerContent: {
    flex: 1,
    marginRight: 10,
  },
  listerBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  listerBannerSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
    lineHeight: 14,
  },
  listerBannerBtn: {
    backgroundColor: '#00D47E',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  listerBannerBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0A0D16',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#0A0D16',
    letterSpacing: -0.2,
  },
  feedCount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
});

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
import { Search, MapPin, Plus, Clock, ArrowRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { JourneyCard, JourneyItem } from '../../components/JourneyCard';
import { SafetyPill } from '../../components/SafetyPill';

const SAMPLE_JOURNEYS: JourneyItem[] = [
  {
    id: '1',
    driverName: 'Dr. Kunle Alabi',
    driverRating: 4.9,
    tripCount: 48,
    originAddress: 'Akobo, General Gas Junction',
    destinationAddress: 'Dugbe, Cocoa House',
    departureTime: '7:30 AM',
    availableSeats: 2,
    perSeatNaira: 400,
    estimatedDetourMins: 4,
    vehicleModel: 'Toyota Corolla',
    vehiclePlate: 'OYO-742-BDJ',
    hasAc: true,
    hasLuggageSpace: true,
    isVerified: true,
  },
  {
    id: '2',
    driverName: 'Mrs. Funke Adeyemi',
    driverRating: 5.0,
    tripCount: 34,
    originAddress: 'UI Post Office Hub',
    destinationAddress: 'Oyo State Secretariat, Agodi',
    departureTime: '7:45 AM',
    availableSeats: 3,
    perSeatNaira: 300,
    estimatedDetourMins: 2,
    vehicleModel: 'Honda City',
    vehiclePlate: 'OYO-188-LU',
    hasAc: true,
    hasLuggageSpace: false,
    isVerified: true,
  },
  {
    id: '3',
    driverName: 'Engr. Yemi Ogundimu',
    driverRating: 4.8,
    tripCount: 22,
    originAddress: 'Bodija Market Hub',
    destinationAddress: 'Ring Road, High Court',
    departureTime: '8:00 AM',
    availableSeats: 1,
    perSeatNaira: 500,
    estimatedDetourMins: 5,
    vehicleModel: 'Toyota Camry (Muscle)',
    vehiclePlate: 'OYO-904-BDJ',
    hasAc: true,
    hasLuggageSpace: true,
    isVerified: true,
  },
  {
    id: '4',
    driverName: 'Barr. Segun Balogun',
    driverRating: 4.95,
    tripCount: 61,
    originAddress: 'Challenge Central Hub',
    destinationAddress: 'Dugbe / Cocoa House',
    departureTime: '8:15 AM',
    availableSeats: 2,
    perSeatNaira: 400,
    estimatedDetourMins: 3,
    vehicleModel: 'Hyundai Elantra',
    vehiclePlate: 'OYO-302-NR',
    hasAc: true,
    hasLuggageSpace: true,
    isVerified: true,
  },
];

export default function MoveScreen() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState<'find' | 'offer'>('find');
  const [selectedCorridor, setSelectedCorridor] = useState<string>('ALL');
  const [originInput, setOriginInput] = useState('Akobo General Gas');
  const [destInput, setDestInput] = useState('Dugbe Cocoa House');
  const [offerSeats, setOfferSeats] = useState(3);
  const [offerPrice, setOfferPrice] = useState('800');

  const filteredJourneys = SAMPLE_JOURNEYS.filter((journey) => {
    if (selectedCorridor === 'ALL') return true;
    if (selectedCorridor === 'AKOBO') return journey.originAddress.includes('Akobo');
    if (selectedCorridor === 'UI') return journey.originAddress.includes('UI');
    if (selectedCorridor === 'BODIJA') return journey.originAddress.includes('Bodija');
    if (selectedCorridor === 'CHALLENGE') return journey.originAddress.includes('Challenge');
    return true;
  });

  const handlePublishRide = () => {
    alert(`Seats Published! Your route from ${originInput} ➔ ${destInput} (${offerSeats} seats at ₦${offerPrice}/seat) is now live for commuters.`);
    setActiveMode('find');
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top App Bar & Safety */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.title}>MOVE</Text>
            <Text style={styles.subtitle}>Ibadan Corridor Carpooling</Text>
          </View>
          <SafetyPill />
        </View>

        {/* Mode Toggle Switcher */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeMode === 'find' && styles.toggleBtnActive]}
            onPress={() => setActiveMode('find')}
            activeOpacity={0.88}
          >
            <Text style={[styles.toggleBtnText, activeMode === 'find' && styles.toggleBtnTextActive]}>
              Find a Ride
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, activeMode === 'offer' && styles.toggleBtnActive]}
            onPress={() => setActiveMode('offer')}
            activeOpacity={0.88}
          >
            <Text style={[styles.toggleBtnText, activeMode === 'offer' && styles.toggleBtnTextActive]}>
              Offer Seats (Driver Mode)
            </Text>
          </TouchableOpacity>
        </View>

        {activeMode === 'find' ? (
          <>
            {/* Poparide 3-Input Route Card */}
            <View style={styles.routeSelectorCard}>
              <View style={styles.routeInputRow}>
                <View style={[styles.dotSmall, { backgroundColor: colors.primaryDeep }]} />
                <TextInput
                  style={styles.routeTextInput}
                  placeholder="Leaving from (e.g. Akobo General Gas)"
                  placeholderTextColor={colors.textSecondary}
                  value={originInput}
                  onChangeText={setOriginInput}
                />
              </View>
              <View style={styles.inputDivider} />
              <View style={styles.routeInputRow}>
                <View style={[styles.dotSmall, { backgroundColor: colors.move.transitBlue }]} />
                <TextInput
                  style={styles.routeTextInput}
                  placeholder="Going to (e.g. Dugbe Cocoa House)"
                  placeholderTextColor={colors.textSecondary}
                  value={destInput}
                  onChangeText={setDestInput}
                />
              </View>
              <View style={styles.inputDivider} />
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Clock size={13} color={colors.textSecondary} />
                  <Text style={styles.metaText}>Today · 7:15 AM</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaText}>1 Passenger</Text>
                </View>
              </View>
            </View>

            {/* Corridor Quick Filter Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.corridorFilterBar}
            >
              {[
                { id: 'ALL', label: 'All Corridors' },
                { id: 'AKOBO', label: 'Akobo ➔ Dugbe' },
                { id: 'UI', label: 'UI ➔ Secretariat' },
                { id: 'BODIJA', label: 'Bodija ➔ Ring Rd' },
                { id: 'CHALLENGE', label: 'Challenge ➔ Dugbe' },
              ].map((pill) => (
                <TouchableOpacity
                  key={pill.id}
                  style={[styles.filterPill, selectedCorridor === pill.id && styles.filterPillActive]}
                  onPress={() => setSelectedCorridor(pill.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.filterPillText, selectedCorridor === pill.id && styles.filterPillTextActive]}>
                    {pill.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Recurring Routine Highlight */}
            <View style={styles.routineSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your recurring routine</Text>
                <View style={styles.syncBadge}>
                  <Text style={styles.syncText}>DAILY AUTO-SYNC</Text>
                </View>
              </View>

              <View style={styles.routineItem}>
                <View style={styles.routineLeft}>
                  <View style={styles.iconCircle}>
                    <Clock size={16} color={colors.primaryDeep} />
                  </View>
                  <View>
                    <Text style={styles.routineRoute}>Akobo ➔ Dugbe</Text>
                    <Text style={styles.routineMeta}>Mon–Fri · 7:15 AM departure</Text>
                  </View>
                </View>
                <Text style={styles.routinePrice}>₦800/seat</Text>
              </View>
            </View>

            {/* Curated Corridor Matches */}
            <View style={styles.matchesSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Curated matches for today</Text>
                <Text style={styles.matchCountBadge}>{filteredJourneys.length} rides found</Text>
              </View>

              {filteredJourneys.map((journey) => (
                <JourneyCard
                  key={journey.id}
                  journey={journey}
                  onSelect={() => router.push('/modal/booking')}
                />
              ))}
            </View>
          </>
        ) : (
          /* Driver Publisher Form */
          <View style={styles.driverPublisherCard}>
            <Text style={styles.publisherTitle}>Offer Spare Seats Along Your Route</Text>
            <Text style={styles.publisherSub}>
              Share fuel costs on your everyday commute. Escrow holds passenger funds safely until drop-off.
            </Text>

            <View style={styles.publishInputGroup}>
              <Text style={styles.publishLabel}>STARTING POINT</Text>
              <TextInput
                style={styles.publishInput}
                value={originInput}
                onChangeText={setOriginInput}
                placeholder="e.g. Akobo General Gas"
              />
            </View>

            <View style={styles.publishInputGroup}>
              <Text style={styles.publishLabel}>DESTINATION</Text>
              <TextInput
                style={styles.publishInput}
                value={destInput}
                onChangeText={setDestInput}
                placeholder="e.g. Dugbe Cocoa House"
              />
            </View>

            <View style={styles.stepperRow}>
              <View>
                <Text style={styles.publishLabel}>AVAILABLE SEATS</Text>
                <Text style={styles.stepperValue}>{offerSeats} Seats</Text>
              </View>
              <View style={styles.stepperBtns}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setOfferSeats((p) => Math.max(1, p - 1))}
                >
                  <Text style={styles.stepBtnText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => setOfferSeats((p) => Math.min(4, p + 1))}
                >
                  <Text style={styles.stepBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.publishInputGroup}>
              <Text style={styles.publishLabel}>FAIR FUEL CONTRIBUTION PER SEAT (₦)</Text>
              <TextInput
                style={styles.publishInput}
                value={offerPrice}
                onChangeText={setOfferPrice}
                keyboardType="numeric"
                placeholder="800"
              />
            </View>

            <TouchableOpacity
              style={styles.onboardingLinkBtn}
              onPress={() => router.push('/modal/auth-onboarding')}
              activeOpacity={0.8}
            >
              <Text style={styles.onboardingLinkText}>
                Need full vehicle registration & bank payouts? Use Onboarding Portal ➔
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.publishBtn}
              onPress={handlePublishRide}
              activeOpacity={0.88}
            >
              <Text style={styles.publishBtnText}>Publish Route & Start Earning</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  onboardingLinkBtn: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  onboardingLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  scrollContent: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
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
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  toggleBtnTextActive: {
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  routeSelectorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  routeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  dotSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  inputDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 4,
    marginLeft: 18,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  corridorFilterBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
    paddingVertical: 2,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  filterPillActive: {
    backgroundColor: colors.primaryDeep,
    borderColor: colors.primaryDeep,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  routineSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  matchCountBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  syncBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
  },
  routineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 12,
  },
  routineLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineRoute: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  routineMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  routinePrice: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  matchesSection: {
    marginBottom: 20,
  },
  driverPublisherCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  publisherTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginBottom: 4,
  },
  publisherSub: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
    marginBottom: 18,
  },
  publishInputGroup: {
    marginBottom: 14,
  },
  publishLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  publishInput: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  stepperValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginTop: 2,
  },
  stepperBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  stepBtnText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  publishBtn: {
    backgroundColor: colors.primaryDeep,
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  publishBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

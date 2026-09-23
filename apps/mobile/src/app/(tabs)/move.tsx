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
    originAddress: 'Akobo, General Gas Junction',
    destinationAddress: 'Dugbe, Cocoa House',
    departureTime: '7:30 AM',
    availableSeats: 2,
    perSeatNaira: 400,
    estimatedDetourMins: 4,
    isVerified: true,
  },
  {
    id: '2',
    driverName: 'Mrs. Funke Adeyemi',
    driverRating: 5.0,
    originAddress: 'UI Post Office Hub',
    destinationAddress: 'Oyo State Secretariat, Agodi',
    departureTime: '7:45 AM',
    availableSeats: 3,
    perSeatNaira: 300,
    estimatedDetourMins: 2,
    isVerified: true,
  },
  {
    id: '3',
    driverName: 'Engr. Yemi Ogundimu',
    driverRating: 4.8,
    originAddress: 'Bodija Market Hub',
    destinationAddress: 'Ring Road, High Court',
    departureTime: '8:00 AM',
    availableSeats: 1,
    perSeatNaira: 500,
    estimatedDetourMins: 6,
    isVerified: true,
  },
];

export default function MoveScreen() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [activeMode, setActiveMode] = useState<'find' | 'offer'>('find');

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top App Bar & Safety */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.title}>MOVE</Text>
            <Text style={styles.subtitle}>Ibadan Commute Network</Text>
          </View>
          <SafetyPill
            onPressSOS={() => alert('Emergency SOS alert activated. Dialing Oyo 615 hotline...')}
            onPressShare={() => alert('Trip link copied to clipboard.')}
          />
        </View>

        {/* Mode Toggle Switcher */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, activeMode === 'find' && styles.toggleBtnActive]}
            onPress={() => setActiveMode('find')}
            activeOpacity={0.88}
          >
            <Text style={[styles.toggleBtnText, activeMode === 'find' && styles.toggleBtnTextActive]}>
              Find a ride
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, activeMode === 'offer' && styles.toggleBtnActive]}
            onPress={() => setActiveMode('offer')}
            activeOpacity={0.88}
          >
            <Text style={[styles.toggleBtnText, activeMode === 'offer' && styles.toggleBtnTextActive]}>
              Offer seats
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={styles.searchCard}>
          <View style={styles.searchRow}>
            <MapPin size={18} color={colors.primary} />
            <TextInput
              style={styles.input}
              placeholder="Where are you going today?"
              placeholderTextColor={colors.textSecondary}
              value={destination}
              onChangeText={setDestination}
            />
            <TouchableOpacity style={styles.searchBtn} activeOpacity={0.8}>
              <Search size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recurring Routine Highlight */}
        <View style={styles.routineSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your recurring routine</Text>
            <View style={styles.syncBadge}>
              <Text style={styles.syncText}>AUTO-SYNC</Text>
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
            <Text style={styles.viewAllText}>View all</Text>
          </View>

          {SAMPLE_JOURNEYS.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              onSelect={() => router.push('/modal/booking')}
            />
          ))}
        </View>
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
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 14,
    color: colors.textPrimary,
    marginLeft: 10,
  },
  searchBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primaryDeep,
    alignItems: 'center',
    justifyContent: 'center',
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
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
});

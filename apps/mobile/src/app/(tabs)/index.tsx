import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Compass,
  Building,
  ShieldCheck,
  Calendar,
  ArrowRight,
  PlusCircle,
  Sparkles,
  Car,
  Home,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { RoutineCard } from '../../components/RoutineCard';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* High-Tech Luxury Header */}
      <View style={styles.header}>
        <View style={styles.brandingRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>W</Text>
          </View>
          <View>
            <View style={styles.brandTitleRow}>
              <Text style={styles.brandName}>weTag</Text>
              <Text style={styles.brandDot}>•</Text>
              <Text style={styles.brandCity}>Ibadan</Text>
            </View>
            <Text style={styles.screenLabel}>Local Life Grid</Text>
          </View>
        </View>

        <View style={styles.headerControls}>
          <TouchableOpacity
            style={styles.walletPill}
            onPress={() => router.push('/profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.walletPillLabel}>WALLET</Text>
            <Text style={styles.walletPillText}>₦14,500</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => router.push('/profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.avatarBtnText}>TO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting & Grid Status */}
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greeting}>Good morning, Tolu</Text>
          <View style={styles.statusRow}>
            <View style={styles.greenPulse} />
            <Text style={styles.statusSub}>Ibadan Metropolitan · 4 Active Corridors</Text>
          </View>
        </View>
        <View style={styles.trustPill}>
          <ShieldCheck size={13} color="#00D47E" />
          <Text style={styles.trustText}>Tier 2 NIN</Text>
        </View>
      </View>

      {/* SPECIALISED ONBOARDING & LISTING CALLOUT (Driver / Landlord / Rider) */}
      <TouchableOpacity
        style={styles.listingLauncherCard}
        onPress={() => router.push('/modal/auth-onboarding')}
        activeOpacity={0.88}
      >
        <View style={styles.launcherHeader}>
          <View style={styles.sparkleWrap}>
            <Sparkles size={14} color="#00D47E" />
          </View>
          <Text style={styles.launcherTag}>ONBOARDING & LISTING PORTAL</Text>
        </View>
        <Text style={styles.launcherTitle}>List Your Car or Property</Text>
        <Text style={styles.launcherSub}>
          Register your daily commute route or publish verified apartments with zero hidden agent fees.
        </Text>
        <View style={styles.launcherPillRow}>
          <View style={styles.launcherPill}>
            <Car size={12} color="#00D47E" />
            <Text style={styles.launcherPillText}>Car & Route</Text>
          </View>
          <View style={styles.launcherPill}>
            <Home size={12} color="#00D47E" />
            <Text style={styles.launcherPillText}>Apartment</Text>
          </View>
          <View style={styles.launcherCta}>
            <Text style={styles.launcherCtaText}>Start ➔</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Quick Corridor Selection Bar */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Ibadan Arterial Corridors</Text>
        <TouchableOpacity onPress={() => router.push('/move')}>
          <Text style={styles.seeAllText}>Explore all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.corridorBar}
      >
        {[
          { label: 'Akobo ➔ Dugbe', fare: '₦800' },
          { label: 'UI ➔ Secretariat', fare: '₦300' },
          { label: 'Bodija ➔ Ring Road', fare: '₦500' },
          { label: 'Challenge ➔ Dugbe', fare: '₦400' },
          { label: 'Iwo Road ➔ Monatan', fare: '₦350' },
        ].map((corr, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.corridorPill}
            onPress={() => router.push('/move')}
            activeOpacity={0.8}
          >
            <Text style={styles.corridorPillRoute}>{corr.label}</Text>
            <Text style={styles.corridorPillFare}>{corr.fare}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Primary Morning Routine Card */}
      <RoutineCard
        origin="Akobo"
        originSub="General Gas Bus Stop"
        destination="Dugbe"
        destinationSub="Cocoa House Hub"
        timeTarget="7:15 AM target"
        duration="28 mins"
        matchCount={2}
        fare="₦800"
        onPress={() => router.push('/move')}
      />

      {/* Two Core Pillars Grid (MOVE & STAY) */}
      <View style={styles.pillarsGrid}>
        {/* MOVE Pillar */}
        <TouchableOpacity
          style={styles.pillarCard}
          onPress={() => router.push('/move')}
          activeOpacity={0.85}
        >
          <View style={styles.pillarIconBox}>
            <Compass size={20} color="#2563EB" />
          </View>
          <Text style={styles.pillarTitle}>Corridor Rides</Text>
          <Text style={styles.pillarSub}>
            Shared commuter routes. Offline 4-digit PIN escrow security.
          </Text>
          <View style={styles.pillarBadgeRow}>
            <Text style={styles.pillarBadgeText}>12 drivers live</Text>
          </View>
          <View style={styles.pillarAction}>
            <Text style={[styles.actionText, { color: '#2563EB' }]}>Find ride</Text>
            <ArrowRight size={13} color="#2563EB" />
          </View>
        </TouchableOpacity>

        {/* STAY Pillar */}
        <TouchableOpacity
          style={styles.pillarCard}
          onPress={() => router.push('/stay')}
          activeOpacity={0.85}
        >
          <View style={styles.pillarIconBox}>
            <Building size={20} color="#0F172A" />
          </View>
          <Text style={styles.pillarTitle}>Verified Homes</Text>
          <Text style={styles.pillarSub}>
            Real move-in totals upfront. Zero surprise agent packages.
          </Text>
          <View style={styles.pillarBadgeRow}>
            <Text style={[styles.pillarBadgeText, { color: '#0F172A' }]}>
              48 homes audited
            </Text>
          </View>
          <View style={styles.pillarAction}>
            <Text style={[styles.actionText, { color: '#0F172A' }]}>Browse</Text>
            <ArrowRight size={13} color="#0F172A" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Driver Empty Seat Offset Promo */}
      <View style={styles.driverPromoCard}>
        <View style={styles.promoTextCol}>
          <Text style={styles.promoTag}>COMMUTER DRIVER PROGRAM</Text>
          <Text style={styles.promoTitle}>Offset up to ₦18,000/week</Text>
          <Text style={styles.promoBody}>
            Share empty seats on your daily Ibadan commute. Zero commercial taxi hassle.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.promoBtn}
          onPress={() => router.push('/modal/auth-onboarding')}
          activeOpacity={0.88}
        >
          <PlusCircle size={14} color="#FFFFFF" />
          <Text style={styles.promoBtnText}>List Car</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#0A0D16',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 126, 0.3)',
  },
  logoText: {
    color: '#00D47E',
    fontSize: 20,
    fontWeight: '900',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandName: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  brandDot: {
    fontSize: 12,
    color: '#94A3B8',
  },
  brandCity: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00D47E',
  },
  screenLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletPill: {
    backgroundColor: '#0A0D16',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  walletPillLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
  walletPillText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#00D47E',
  },
  avatarBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0A0D16',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 126, 0.3)',
  },
  avatarBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  greenPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00D47E',
  },
  statusSub: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  trustPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  trustText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  listingLauncherCard: {
    backgroundColor: '#0A0D16',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  launcherHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sparkleWrap: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 212, 126, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  launcherTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00D47E',
    letterSpacing: 1,
  },
  launcherTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  launcherSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
    lineHeight: 15,
  },
  launcherPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  launcherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  launcherPillText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  launcherCta: {
    marginLeft: 'auto',
    backgroundColor: '#00D47E',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  launcherCtaText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0A0D16',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  corridorBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    paddingVertical: 2,
  },
  corridorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  corridorPillRoute: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  corridorPillFare: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2563EB',
  },
  pillarsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  pillarIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  pillarSub: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
    marginBottom: 10,
  },
  pillarBadgeRow: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginBottom: 10,
  },
  pillarBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563EB',
  },
  pillarAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  driverPromoCard: {
    backgroundColor: '#0A0D16',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  promoTextCol: {
    flex: 1,
    marginRight: 10,
  },
  promoTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00D47E',
    letterSpacing: 0.8,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  promoBody: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 3,
    lineHeight: 15,
  },
  promoBtn: {
    backgroundColor: '#00D47E',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  promoBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0A0D16',
  },
});

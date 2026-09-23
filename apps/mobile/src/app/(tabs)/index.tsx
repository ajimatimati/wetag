import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Compass, Building, ShieldCheck, Calendar, ArrowRight, PlusCircle } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { RoutineCard } from '../../components/RoutineCard';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Minimalist Header */}
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
            <Text style={styles.screenLabel}>Home Launchpad</Text>
          </View>
        </View>

        <View style={styles.headerControls}>
          <View style={styles.cityPill}>
            <Text style={styles.cityPillText}>Ibadan</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarBtn}
            onPress={() => router.push('/profile')}
            activeOpacity={0.8}
          >
            <Text style={styles.avatarBtnText}>TO</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting & Trust Row */}
      <View style={styles.greetingRow}>
        <View>
          <Text style={styles.greeting}>Good morning, Tolu 👋</Text>
          <View style={styles.statusRow}>
            <View style={styles.greenPulse} />
            <Text style={styles.statusSub}>Ibadan North · Route Ready</Text>
          </View>
        </View>
        <View style={styles.trustPill}>
          <ShieldCheck size={14} color={colors.primary} />
          <Text style={styles.trustText}>Verified</Text>
        </View>
      </View>

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

      {/* Upcoming Return Commute Indicator */}
      <TouchableOpacity
        style={styles.returnCard}
        onPress={() => router.push('/move')}
        activeOpacity={0.88}
      >
        <View style={styles.returnIconBox}>
          <Calendar size={16} color={colors.primary} />
        </View>
        <View style={styles.returnContent}>
          <Text style={styles.returnTag}>UPCOMING RETURN · 5:30 PM TODAY</Text>
          <Text style={styles.returnTitle} numberOfLines={1}>
            Dugbe ➔ Akobo (Confirmed with Babatunde)
          </Text>
        </View>
        <ArrowRight size={16} color={colors.textMuted} />
      </TouchableOpacity>

      {/* Dual Pillar Action Grid (Generous Whitespace, Lean Copy) */}
      <View style={styles.dualGrid}>
        {/* MOVE Card */}
        <TouchableOpacity
          style={[styles.pillarCard, styles.moveBorder]}
          onPress={() => router.push('/move')}
          activeOpacity={0.88}
        >
          <View style={[styles.pillarIconBox, { backgroundColor: '#EFF6FF' }]}>
            <Compass size={22} color={colors.move.transitBlue} />
          </View>
          <Text style={styles.pillarTitle}>Daily Commute</Text>
          <Text style={styles.pillarSub}>Share rides from ₦300 across Akobo, UI, Dugbe.</Text>
          <View style={styles.pillarAction}>
            <Text style={[styles.actionText, { color: colors.move.transitBlue }]}>Find ride</Text>
            <ArrowRight size={13} color={colors.move.transitBlue} />
          </View>
        </TouchableOpacity>

        {/* STAY Card */}
        <TouchableOpacity
          style={[styles.pillarCard, styles.stayBorder]}
          onPress={() => router.push('/stay')}
          activeOpacity={0.88}
        >
          <View style={[styles.pillarIconBox, { backgroundColor: '#FEF3C7' }]}>
            <Building size={22} color={colors.stay.warmClay} />
          </View>
          <Text style={styles.pillarTitle}>Verified Homes</Text>
          <Text style={styles.pillarSub}>Real move-in totals. Zero surprise agent markups.</Text>
          <View style={styles.pillarAction}>
            <Text style={[styles.actionText, { color: colors.stay.warmClay }]}>Browse</Text>
            <ArrowRight size={13} color={colors.stay.warmClay} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Driver Empty Seat Offset Promo */}
      <View style={styles.driverPromoCard}>
        <View style={styles.promoTextCol}>
          <Text style={styles.promoTag}>EMPTY SEAT OFFSET</Text>
          <Text style={styles.promoTitle}>Driving to work today?</Text>
          <Text style={styles.promoBody}>
            Offset fuel costs by sharing spare seats along your route.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.promoBtn}
          onPress={() => router.push('/move')}
          activeOpacity={0.88}
        >
          <PlusCircle size={15} color="#FFFFFF" />
          <Text style={styles.promoBtnText}>Offer seats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF8',
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
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.primaryDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: 0.5,
  },
  brandDot: {
    fontSize: 12,
    color: colors.textMuted,
  },
  brandCity: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  screenLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cityPill: {
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 9999,
  },
  cityPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  avatarBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primaryDeep,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 18,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
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
    backgroundColor: colors.primary,
  },
  statusSub: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  trustPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 9999,
    gap: 4,
  },
  trustText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  returnCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  returnIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  returnContent: {
    flex: 1,
    marginRight: 8,
  },
  returnTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.6,
  },
  returnTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 1,
  },
  dualGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  pillarCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'space-between',
  },
  moveBorder: {
    borderColor: '#DBEAFE',
  },
  stayBorder: {
    borderColor: '#FEF3C7',
  },
  pillarIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pillarTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  pillarSub: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
    marginBottom: 12,
  },
  pillarAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  driverPromoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  promoTag: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  promoBody: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  promoBtn: {
    backgroundColor: colors.primaryDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 9999,
  },
  promoBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

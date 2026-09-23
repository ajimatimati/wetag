import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Compass, Building, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, Tolu 👋</Text>
          <Text style={styles.subGreeting}>Ibadan · Ibadan North</Text>
        </View>
        <View style={styles.trustBadge}>
          <ShieldCheck size={16} color={colors.primary} />
          <Text style={styles.trustText}>Verified</Text>
        </View>
      </View>

      {/* Hero Welcome */}
      <View style={styles.heroBanner}>
        <Text style={styles.heroTag}>LOCAL LIFE NETWORK</Text>
        <Text style={styles.heroTitle}>Move better. Find your place.</Text>
        <Text style={styles.heroBody}>
          Share everyday journeys with trusted commuters, or find transparent, verified housing in Ibadan.
        </Text>
      </View>

      {/* Dual Pillar Cards */}
      <Text style={styles.sectionTitle}>What do you need today?</Text>

      {/* MOVE CARD */}
      <TouchableOpacity
        style={[styles.pillarCard, styles.moveCard]}
        onPress={() => router.push('/move')}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconWrapper, styles.moveIcon]}>
            <Compass size={24} color={colors.primaryDeep} />
          </View>
          <View style={styles.pillBadgeMove}>
            <Text style={styles.pillTextMove}>MOVE</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>Share a Journey / Commute</Text>
        <Text style={styles.cardDesc}>
          Join neighbours driving your way. Cost-sharing from ₦300 across Akobo, Bodija, UI & Dugbe.
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.footerActionMove}>Find rides or offer seats</Text>
          <ArrowRight size={16} color={colors.primaryDeep} />
        </View>
      </TouchableOpacity>

      {/* STAY CARD */}
      <TouchableOpacity
        style={[styles.pillarCard, styles.stayCard]}
        onPress={() => router.push('/stay')}
        activeOpacity={0.9}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconWrapper, styles.stayIcon]}>
            <Building size={24} color={colors.stay.accentDeep} />
          </View>
          <View style={styles.pillBadgeStay}>
            <Text style={styles.pillTextStay}>STAY</Text>
          </View>
        </View>
        <Text style={styles.cardTitle}>Find a Home / Split Rent</Text>
        <Text style={styles.cardDesc}>
          Transparent Real Move-In Totals. Verified listings, flatmate matching, and NYSC Settle-In.
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.footerActionStay}>Browse verified homes</Text>
          <ArrowRight size={16} color={colors.stay.accentDeep} />
        </View>
      </TouchableOpacity>

      {/* Settle In Quick Highlight */}
      <View style={styles.settleInCard}>
        <View style={styles.settleInHeader}>
          <Sparkles size={18} color={colors.warning} />
          <Text style={styles.settleInTitle}>New to Ibadan / NYSC?</Text>
        </View>
        <Text style={styles.settleInBody}>
          Filter accommodation by your PPA location and match with vetted flatmates.
        </Text>
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
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subGreeting: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  trustText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  heroBanner: {
    backgroundColor: colors.primaryDeep,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  heroTag: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  heroBody: {
    color: '#D1DDD9',
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  pillarCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.5,
  },
  moveCard: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.primaryLight,
  },
  stayCard: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.stay.accentLight,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveIcon: {
    backgroundColor: colors.primaryLight,
  },
  stayIcon: {
    backgroundColor: colors.stay.accentLight,
  },
  pillBadgeMove: {
    backgroundColor: colors.primaryLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pillTextMove: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  pillBadgeStay: {
    backgroundColor: colors.stay.accentLight,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  pillTextStay: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.stay.accentDeep,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  footerActionMove: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  footerActionStay: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.stay.accentDeep,
  },
  settleInCard: {
    backgroundColor: '#FFFDF7',
    borderWidth: 1,
    borderColor: '#F3E5C8',
    borderRadius: 16,
    padding: 16,
    marginTop: 4,
  },
  settleInHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  settleInTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settleInBody: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});

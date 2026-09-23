import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  ShieldCheck,
  Droplets,
  Zap,
  Shield,
  Clock,
  Users,
  CalendarCheck,
  Share2,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';

export default function ListingDetailModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    neighborhood: string;
    rentAmount: string;
    agencyFee: string;
    legalFee: string;
    cautionDeposit: string;
    serviceCharge: string;
    totalMoveInCost: string;
    propertyType: string;
  }>();

  const [flatmatesCount, setFlatmatesCount] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  const rent = parseInt(params.rentAmount || '70000000', 10) / 100;
  const agency = parseInt(params.agencyFee || '7000000', 10) / 100;
  const legal = parseInt(params.legalFee || '7000000', 10) / 100;
  const caution = parseInt(params.cautionDeposit || '5000000', 10) / 100;
  const service = parseInt(params.serviceCharge || '0', 10) / 100;
  const totalMoveIn = rent + agency + legal + caution + service;

  // Split calculation
  const totalOccupants = flatmatesCount + 1;
  const splitShare = Math.round(totalMoveIn / totalOccupants);
  const monthlyShare = Math.round((rent / 12 + 15000) / totalOccupants); // including approx utilities

  const handleBookViewing = async () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      Alert.alert(
        'Physical Viewing Reserved',
        `Your inspection for "${params.title || '2-Bedroom Flat in Old Bodija'}" is scheduled for Saturday at 11:00 AM.\n\nCivic Protection: Check in on the app when you arrive at the gate. Escrow holds your deposit until key handover.`
      );
    }, 400);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn} activeOpacity={0.7}>
          <ArrowLeft size={18} color={colors.primaryDeep} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <Share2 size={18} color={colors.primaryDeep} />
        </TouchableOpacity>
      </View>

      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          }}
          style={styles.heroImage}
        />
        <View style={styles.verifiedBadge}>
          <ShieldCheck size={13} color="#FFFFFF" />
          <Text style={styles.verifiedText}>Civic Verified · Oyo Deed Inspected</Text>
        </View>
      </View>

      {/* Property Title & Location */}
      <View style={styles.titleSection}>
        <Text style={styles.neighborhoodTag}>
          {params.neighborhood ? params.neighborhood.toUpperCase() : 'OLD BODIJA, IBADAN'}
        </Text>
        <Text style={styles.title}>{params.title || '2-Bedroom Flat in Old Bodija'}</Text>
      </View>

      {/* Real Move-In Hero Card */}
      <View style={styles.heroPriceCard}>
        <View style={styles.priceHeaderRow}>
          <Text style={styles.priceSubtitle}>REAL MOVE-IN TOTAL</Text>
          <View style={styles.noHiddenBadge}>
            <Text style={styles.noHiddenText}>Zero Surprise Fees</Text>
          </View>
        </View>
        <Text style={styles.heroPriceText}>₦{totalMoveIn.toLocaleString()}</Text>
        <Text style={styles.rentFrequencyText}>
          Covers 1 year rent + agency + legal agreement + caution deposit
        </Text>
      </View>

      {/* Itemized Fee Guarantee */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Itemized Legal Breakdown</Text>
        <View style={styles.feeCard}>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Annual Base Rent</Text>
            <Text style={styles.feeValue}>₦{rent.toLocaleString()}</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Agency Fee (10% capped)</Text>
            <Text style={styles.feeValue}>₦{agency.toLocaleString()}</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Legal Agreement (10% capped)</Text>
            <Text style={styles.feeValue}>₦{legal.toLocaleString()}</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.feeLabel}>Caution Deposit (Refundable Escrow)</Text>
            <Text style={styles.feeValue}>₦{caution.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.feeRow}>
            <Text style={styles.totalLabel}>Total Upfront Commitment</Text>
            <Text style={styles.totalValue}>₦{totalMoveIn.toLocaleString()}</Text>
          </View>
        </View>
      </View>

      {/* Monthly Living Reality */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Living Reality</Text>
        <View style={styles.monthlyCard}>
          <View style={styles.monthlyTopRow}>
            <Text style={styles.monthlyLabel}>Estimated Monthly Living Cost</Text>
            <Text style={styles.monthlyAmount}>~₦74,000/mo</Text>
          </View>
          <Text style={styles.monthlyDesc}>
            Amortized rent (₦58.3k) + IBEDC Band B electricity (~₦12k) + Estate security & borehole
            (~₦3.7k).
          </Text>
        </View>
      </View>

      {/* Nigerian Infrastructure Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Verified Property Utilities</Text>
        <View style={styles.utilityGrid}>
          <View style={styles.utilityBadge}>
            <Droplets size={16} color={colors.primary} />
            <View>
              <Text style={styles.utilityTitle}>24/7 Borehole</Text>
              <Text style={styles.utilitySub}>Continuous pump supply</Text>
            </View>
          </View>
          <View style={styles.utilityBadge}>
            <Zap size={16} color="#D97706" />
            <View>
              <Text style={styles.utilityTitle}>Prepaid Meter</Text>
              <Text style={styles.utilitySub}>Dedicated IBEDC Band B</Text>
            </View>
          </View>
          <View style={styles.utilityBadge}>
            <Clock size={16} color={colors.primaryDeep} />
            <View>
              <Text style={styles.utilityTitle}>Gen Back-Up</Text>
              <Text style={styles.utilitySub}>6:00 PM – 6:00 AM</Text>
            </View>
          </View>
          <View style={styles.utilityBadge}>
            <Shield size={16} color={colors.stay.accentDeep} />
            <View>
              <Text style={styles.utilityTitle}>Gated Security</Text>
              <Text style={styles.utilitySub}>Estate checkpoint entry</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Flatmate Co-Living Split */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Co-Living Flatmate Split</Text>
        <View style={styles.splitCard}>
          <View style={styles.splitHeader}>
            <Users size={16} color={colors.warmClay} />
            <Text style={styles.splitSubtitle}>Share this 2-bed flat with flatmates:</Text>
          </View>

          <View style={styles.splitBtnRow}>
            {[1, 2].map((count) => (
              <TouchableOpacity
                key={count}
                style={[styles.splitBtn, flatmatesCount === count && styles.splitBtnActive]}
                onPress={() => setFlatmatesCount(count)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.splitBtnText,
                    flatmatesCount === count && styles.splitBtnTextActive,
                  ]}
                >
                  +{count} Flatmate{count > 1 ? 's' : ''} ({count + 1} Total)
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.splitSummaryBox}>
            <Text style={styles.splitSummaryLabel}>Your Individual Share:</Text>
            <Text style={styles.splitSummaryTotal}>₦{splitShare.toLocaleString()}</Text>
            <Text style={styles.splitSummarySub}>
              Upfront move-in · ~₦{monthlyShare.toLocaleString()}/mo with utilities
            </Text>
          </View>
        </View>
      </View>

      {/* Action CTA */}
      <TouchableOpacity
        style={[styles.primaryBtn, isBooking && { opacity: 0.7 }]}
        onPress={handleBookViewing}
        disabled={isBooking}
        activeOpacity={0.88}
      >
        <CalendarCheck size={18} color="#FFFFFF" />
        <Text style={styles.primaryBtnText}>
          {isBooking ? 'Securing Viewing...' : 'Book Physical Inspection'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF8',
  },
  content: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 20,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(12, 41, 39, 0.88)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  titleSection: {
    marginBottom: 16,
  },
  neighborhoodTag: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.warmClay,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: -0.3,
  },
  heroPriceCard: {
    backgroundColor: colors.primaryDeep,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#0C2927',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  priceHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  noHiddenBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  noHiddenText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  heroPriceText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 6,
    letterSpacing: -0.5,
  },
  rentFrequencyText: {
    fontSize: 12,
    color: '#A0B4B0',
    lineHeight: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  feeCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  feeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  feeValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  monthlyCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  monthlyTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  monthlyLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  monthlyAmount: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.warmClay,
  },
  monthlyDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  utilityGrid: {
    gap: 10,
  },
  utilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  utilityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  utilitySub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  splitCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  splitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  splitSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  splitBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  splitBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  splitBtnActive: {
    backgroundColor: colors.warmClay,
  },
  splitBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  splitBtnTextActive: {
    color: '#FFFFFF',
  },
  splitSummaryBox: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  splitSummaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  splitSummaryTotal: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.primaryDeep,
    marginVertical: 4,
  },
  splitSummarySub: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: colors.primaryDeep,
    paddingVertical: 16,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    shadowColor: '#0C2927',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

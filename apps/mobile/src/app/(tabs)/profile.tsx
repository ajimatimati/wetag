import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import {
  ShieldCheck,
  Wallet,
  Car,
  Home,
  ArrowUpRight,
  PlusCircle,
  FileCheck,
  ChevronRight,
  PhoneCall,
  Lock,
  LogOut,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { LivingLedgerCard } from '../../components/LivingLedgerCard';

export default function ProfileScreen() {
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState(14500); // ₦14,500

  const handleTopUp = () => {
    Alert.alert(
      'Top Up Wallet',
      'Instant Transfer rails available via OPay, PalmPay, and Nigerian Commercial Banks.\n\nVirtual Account: Wema Bank - 9912048821 (weTag/Tolu Olaniyi)'
    );
  };

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Funds',
      'Withdraw to your verified Nigerian Bank Account (GTBank · •••• 4120). Available: ₦' +
        walletBalance.toLocaleString()
    );
  };

  const handleSettleLedger = () => {
    if (walletBalance >= 6133) {
      setWalletBalance((prev) => prev - 6133);
      Alert.alert(
        'Expense Settled',
        '₦6,133 successfully paid from Universal Wallet to Bodija Flatmate Ledger.'
      );
    } else {
      Alert.alert('Insufficient Balance', 'Please top up your Universal Wallet.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TO</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>Tolu Olaniyi</Text>
          <Text style={styles.phone}>+234 803 ••• ••45</Text>
          <View style={styles.trustBadge}>
            <ShieldCheck size={13} color={colors.primary} />
            <Text style={styles.trustText}>NIN Verified · Tier 2</Text>
          </View>
        </View>
      </View>

      {/* Nikky / Trantor Luxury Stacked Paystack Virtual Card */}
      <View style={styles.walletCardWrapper}>
        <View style={styles.walletCardBackgroundStack} />
        <View style={styles.walletCard}>
          <View style={styles.cardTopRow}>
            <View style={styles.cardChipBadge}>
              <View style={styles.emvChip} />
              <Text style={styles.contactlessSymbol}>)))</Text>
            </View>
            <View style={styles.paystackNetworkBadge}>
              <Text style={styles.paystackNetworkText}>weTag · Paystack</Text>
            </View>
          </View>

          <View style={styles.cardBalanceSection}>
            <Text style={styles.balanceLabel}>Universal Liquid Balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>₦{walletBalance.toLocaleString()}</Text>
              <View style={styles.balanceGrowthChip}>
                <Text style={styles.balanceGrowthText}>+₦2,400 Fuel Return</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardDetailsRow}>
            <View>
              <Text style={styles.cardNumber}>9912 •••• •••• 8821</Text>
              <Text style={styles.cardHolder}>TOLU OLANIYI · WEMA NUBAN</Text>
            </View>
            <View style={styles.cardExpiryBlock}>
              <Text style={styles.cardExpiryLabel}>VALID</Text>
              <Text style={styles.cardExpiry}>12/28</Text>
            </View>
          </View>
        </View>

        {/* Trantor-Grade Dual Split Pills [Top-Up] + [Withdraw] */}
        <View style={styles.trantorPillRow}>
          <TouchableOpacity
            style={styles.peachTopUpBtn}
            onPress={handleTopUp}
            activeOpacity={0.85}
          >
            <PlusCircle size={15} color="#0A0D16" />
            <Text style={styles.peachTopUpText}>Instant Top-Up</Text>
          </TouchableOpacity>

          <View style={styles.trantorCenterDisc}>
            <Text style={styles.trantorCenterDiscText}>⇄</Text>
          </View>

          <TouchableOpacity
            style={styles.mintWithdrawBtn}
            onPress={handleWithdraw}
            activeOpacity={0.85}
          >
            <ArrowUpRight size={15} color="#0A0D16" />
            <Text style={styles.mintWithdrawText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Shared Household Ledger Component */}
      <View style={styles.sectionHeaderWrap}>
        <Text style={styles.sectionHeader}>Active Shared Flat</Text>
        <Text style={styles.sectionSub}>Live IBEDC & Living Expenses</Text>
      </View>
      <LivingLedgerCard
        apartmentName="The Bodija 3-Bed Apartment"
        totalMonthlyExpense={18400}
        userShare={6133}
        dueDate="Due in 3 days"
        onSettle={handleSettleLedger}
      />

      {/* Active Roles */}
      <View style={styles.sectionHeaderWrap}>
        <Text style={styles.sectionHeader}>Active Roles</Text>
      </View>

      <TouchableOpacity style={styles.roleCard} activeOpacity={0.7}>
        <View style={styles.roleLeft}>
          <View style={[styles.roleIcon, { backgroundColor: colors.move.transitLight }]}>
            <Car size={18} color={colors.transitBlue} />
          </View>
          <View>
            <Text style={styles.roleName}>Verified Commuter</Text>
            <Text style={styles.roleSub}>Stars  4.95 Rating · 14 Trips (Akobo  Dugbe)</Text>
          </View>
        </View>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.roleCard} activeOpacity={0.7}>
        <View style={styles.roleLeft}>
          <View style={[styles.roleIcon, { backgroundColor: colors.stay.accentLight }]}>
            <Home size={18} color={colors.warmClay} />
          </View>
          <View>
            <Text style={styles.roleName}>Verified Co-Tenant</Text>
            <Text style={styles.roleSub}>The Bodija 3-Bed (33.3% share)</Text>
          </View>
        </View>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Trust & Safety Settings */}
      <View style={styles.sectionHeaderWrap}>
        <Text style={styles.sectionHeader}>Trust & Civic Safety</Text>
      </View>

      <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
        <View style={styles.settingLeft}>
          <FileCheck size={16} color={colors.primaryDeep} />
          <View>
            <Text style={styles.settingText}>Identity & NIN Records</Text>
            <Text style={styles.settingSub}>Government issued ID verified</Text>
          </View>
        </View>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
        <View style={styles.settingLeft}>
          <PhoneCall size={16} color={colors.primaryDeep} />
          <View>
            <Text style={styles.settingText}>Oyo State 615 Emergency Hotline</Text>
            <Text style={styles.settingSub}>2 trusted contacts linked</Text>
          </View>
        </View>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow} activeOpacity={0.7}>
        <View style={styles.settingLeft}>
          <Lock size={16} color={colors.primaryDeep} />
          <View>
            <Text style={styles.settingText}>Masked Phone Relays</Text>
            <Text style={styles.settingSub}>Caller ID privacy active</Text>
          </View>
        </View>
        <ChevronRight size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Quick Launch Onboarding Portal */}
      <TouchableOpacity
        style={styles.onboardingBanner}
        onPress={() => router.push('/modal/auth-onboarding')}
        activeOpacity={0.88}
      >
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.onboardingBannerTitle}>List Another Car or Property</Text>
          <Text style={styles.onboardingBannerSub}>
            Switch between driver, rider, or landlord verified roles in 1 tap.
          </Text>
        </View>
        <View style={styles.onboardingBannerBtn}>
          <Text style={styles.onboardingBannerBtnText}>Manage </Text>
        </View>
      </TouchableOpacity>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutBtn} activeOpacity={0.7}>
        <LogOut size={16} color="#DC2626" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  onboardingBanner: {
    backgroundColor: '#0A0D16',
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  onboardingBannerTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  onboardingBannerSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
  },
  onboardingBannerBtn: {
    backgroundColor: '#00D47E',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  onboardingBannerBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0A0D16',
  },
  content: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryDeep,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  phone: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: 4,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  trustText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  walletCardWrapper: {
    marginBottom: 24,
    position: 'relative',
  },
  walletCardBackgroundStack: {
    position: 'absolute',
    top: -6,
    left: 14,
    right: 14,
    height: 190,
    backgroundColor: '#1E293B',
    borderRadius: 22,
    opacity: 0.5,
  },
  walletCard: {
    backgroundColor: '#0A0D16',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardChipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emvChip: {
    width: 32,
    height: 24,
    borderRadius: 5,
    backgroundColor: '#E2E8F0',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  contactlessSymbol: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '800',
    transform: [{ rotate: '90deg' }],
  },
  paystackNetworkBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  paystackNetworkText: {
    color: '#00D47E',
    fontSize: 10,
    fontWeight: '800',
  },
  cardBalanceSection: {
    marginBottom: 16,
  },
  balanceLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  balanceGrowthChip: {
    backgroundColor: 'rgba(0, 212, 126, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 126, 0.3)',
  },
  balanceGrowthText: {
    color: '#00D47E',
    fontSize: 10,
    fontWeight: '800',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardNumber: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  cardHolder: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  cardExpiryBlock: {
    alignItems: 'flex-end',
  },
  cardExpiryLabel: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '800',
  },
  cardExpiry: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  trantorPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 8,
  },
  peachTopUpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FED7AA',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 6,
  },
  peachTopUpText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A0D16',
  },
  trantorCenterDisc: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0A0D16',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trantorCenterDiscText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  mintWithdrawBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A7F3D0',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 6,
  },
  mintWithdrawText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0A0D16',
  },
  walletBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    gap: 6,
  },
  topupBtn: {
    backgroundColor: colors.primary,
  },
  topupBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  withdrawBtn: {
    backgroundColor: '#FFFFFF',
  },
  withdrawBtnText: {
    color: colors.primaryDeep,
    fontWeight: '700',
    fontSize: 12,
  },
  sectionHeaderWrap: {
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: -0.2,
  },
  sectionSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 10,
  },
  roleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roleIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  roleSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginTop: 12,
  },
  signOutText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '700',
  },
});

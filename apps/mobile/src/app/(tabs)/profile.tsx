import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
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

      {/* Universal Wallet Card */}
      <View style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <View style={styles.walletTitleRow}>
            <Wallet size={16} color={colors.primary} />
            <Text style={styles.walletTitle}>Universal Wallet</Text>
          </View>
          <View style={styles.currencyBadge}>
            <Text style={styles.currencyBadgeText}>NGN (₦)</Text>
          </View>
        </View>

        <Text style={styles.balanceLabel}>Available for Carpools & Living Bills</Text>
        <Text style={styles.balanceAmount}>₦{walletBalance.toLocaleString()}</Text>

        {/* Dedicated Nigerian NUBAN Virtual Account */}
        <View style={styles.nubanBox}>
          <View>
            <Text style={styles.nubanLabel}>DEDICATED NUBAN TRANSFER ACCOUNT</Text>
            <Text style={styles.nubanNumber}>Wema Bank · 9912048821</Text>
            <Text style={styles.nubanName}>weTag / Tolu Olaniyi</Text>
          </View>
          <View style={styles.instantBadge}>
            <Text style={styles.instantBadgeText}>Instant &lt;10s</Text>
          </View>
        </View>

        <View style={styles.walletActions}>
          <TouchableOpacity
            style={[styles.walletBtn, styles.topupBtn]}
            onPress={handleTopUp}
            activeOpacity={0.8}
          >
            <PlusCircle size={15} color="#FFFFFF" />
            <Text style={styles.topupBtnText}>Top Up (OPay/Transfer)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.walletBtn, styles.withdrawBtn]}
            onPress={handleWithdraw}
            activeOpacity={0.8}
          >
            <ArrowUpRight size={15} color={colors.primaryDeep} />
            <Text style={styles.withdrawBtnText}>Withdraw</Text>
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
            <Text style={styles.roleSub}>★ 4.95 Rating · 14 Trips (Akobo ➔ Dugbe)</Text>
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
    backgroundColor: '#F7FAF8',
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
  walletCard: {
    backgroundColor: colors.primaryDeep,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#0C2927',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  walletTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  currencyBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  currencyBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },
  balanceLabel: {
    color: '#A0B4B0',
    fontSize: 11,
    fontWeight: '500',
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  nubanBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  nubanLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.8,
  },
  nubanNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  nubanName: {
    fontSize: 11,
    color: '#D1DDD9',
    marginTop: 1,
  },
  instantBadge: {
    backgroundColor: 'rgba(24, 184, 138, 0.25)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  instantBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#A7F3D0',
  },
  walletActions: {
    flexDirection: 'row',
    gap: 10,
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

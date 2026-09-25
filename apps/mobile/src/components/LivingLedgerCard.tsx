import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Zap, Fuel, Shield, ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface LivingLedgerCardProps {
  apartmentName?: string;
  totalMonthlyExpense?: number;
  userShare?: number;
  dueDate?: string;
  ibedcUnitsKwh?: number;
  dieselPercent?: number;
  onSettle?: () => void;
}

export const LivingLedgerCard: React.FC<LivingLedgerCardProps> = ({
  apartmentName = 'Bodija 3-Bed Apartment',
  totalMonthlyExpense = 18400,
  userShare = 6133,
  dueDate = 'Due in 3 days',
  ibedcUnitsKwh = 142,
  dieselPercent = 65,
  onSettle,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.categoryTitle}>SHARED LIVING LEDGER · 3 CO-TENANTS</Text>
          <Text style={styles.apartmentName}>{apartmentName}</Text>
        </View>
        <View style={styles.dueBadge}>
          <Text style={styles.dueText}>{dueDate}</Text>
        </View>
      </View>

      {/* Expense Allocation Box */}
      <View style={styles.allocationBox}>
        <View>
          <Text style={styles.shareLabel}>YOUR 33.3% ALLOCATION</Text>
          <Text style={styles.shareAmount}>₦{userShare.toLocaleString()}</Text>
        </View>
        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>Month-to-Date Total</Text>
          <Text style={styles.totalAmount}>₦{totalMonthlyExpense.toLocaleString()}</Text>
        </View>
      </View>

      {/* Real-time Ibadan Utility Telemetry Bar */}
      <View style={styles.telemetryRow}>
        <View style={styles.telemetryChip}>
          <Text style={styles.telemetryLabel}>⚡ IBEDC Units:</Text>
          <Text style={styles.telemetryValue}>{ibedcUnitsKwh} kWh (~9 days)</Text>
        </View>
        <View style={styles.telemetryChip}>
          <Text style={styles.telemetryLabel}>⛽ Gen Tank:</Text>
          <Text style={styles.telemetryValue}>{dieselPercent}% Full</Text>
        </View>
      </View>

      {/* Items Breakdown */}
      <View style={styles.breakdownRow}>
        <View style={styles.breakdownItem}>
          <Zap size={13} color="#D97706" />
          <Text style={styles.breakdownText}>IBEDC Band B (₦12k)</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Fuel size={13} color={colors.primaryDeep} />
          <Text style={styles.breakdownText}>Diesel (₦4.5k)</Text>
        </View>
        <View style={styles.breakdownItem}>
          <Shield size={13} color={colors.stay.accentDeep} />
          <Text style={styles.breakdownText}>Estate (₦1.9k)</Text>
        </View>
      </View>

      {/* Flatmate Settlement Avatars */}
      <View style={styles.flatmateStatusRow}>
        <View style={styles.flatmateAvatarGroup}>
          <View style={[styles.fmAvatar, styles.fmAvatarPaid]}>
            <Text style={styles.fmAvatarText}>TO</Text>
          </View>
          <View style={[styles.fmAvatar, styles.fmAvatarPaid, { marginLeft: -6 }]}>
            <Text style={styles.fmAvatarText}>BD</Text>
          </View>
          <View style={[styles.fmAvatar, styles.fmAvatarPending, { marginLeft: -6 }]}>
            <Text style={styles.fmAvatarText}>CH</Text>
          </View>
          <Text style={styles.flatmateStatusText}>2 of 3 settled</Text>
        </View>
      </View>

      {/* Action */}
      <TouchableOpacity
        style={styles.settleBtn}
        onPress={onSettle}
        activeOpacity={0.88}
      >
        <Text style={styles.settleBtnText}>1-Tap Settle ₦{userShare.toLocaleString()} via Wallet</Text>
        <ArrowRight size={14} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  categoryTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.stay.warmClay,
    letterSpacing: 0.8,
  },
  apartmentName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  dueBadge: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  dueText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#B45309',
  },
  allocationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  shareLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: 0.5,
  },
  shareAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.primaryDeep,
    marginTop: 2,
  },
  totalBlock: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 2,
  },
  telemetryRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  telemetryChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAF9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E6ECE8',
  },
  telemetryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  telemetryValue: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    marginBottom: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  breakdownText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  flatmateStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  flatmateAvatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fmAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  fmAvatarPaid: {
    backgroundColor: colors.primary,
  },
  fmAvatarPending: {
    backgroundColor: '#F59E0B',
  },
  fmAvatarText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  flatmateStatusText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginLeft: 8,
  },
  settleBtn: {
    backgroundColor: colors.primaryDeep,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 9999,
  },
  settleBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

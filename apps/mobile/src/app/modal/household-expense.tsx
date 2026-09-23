import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Zap, Droplets, Fuel, Shield, Sparkles, Check } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const EXPENSE_CATEGORIES = [
  { id: 'ELECTRICITY', label: 'IBEDC Prepaid', icon: Zap, color: '#D97706' },
  { id: 'WATER', label: 'Water Tanker', icon: Droplets, color: colors.primary },
  { id: 'DIESEL', label: 'Gen Diesel', icon: Fuel, color: colors.primaryDeep },
  { id: 'SECURITY', label: 'Estate Dues', icon: Shield, color: colors.stay.accentDeep },
  { id: 'CLEANING', label: 'Compound & Waste', icon: Sparkles, color: colors.warmClay },
];

export default function HouseholdExpenseModal() {
  const router = useRouter();
  const [category, setCategory] = useState('ELECTRICITY');
  const [description, setDescription] = useState('August IBEDC Units Recharge');
  const [amount, setAmount] = useState('18400');
  const [splitType, setSplitType] = useState<'EQUAL' | 'BY_RENT_SHARE'>('EQUAL');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numAmount = parseFloat(amount) || 0;
  const equalShare = numAmount > 0 ? Math.round(numAmount / 3) : 0; // 3-person flatmate group

  const handleSaveExpense = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Expense Recorded in Ledger',
        `₦${numAmount.toLocaleString()} logged for "${description}".\n\nEach flatmate's share of ₦${equalShare.toLocaleString()} has been queued for 1-tap settlement.`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }, 400);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={18} color={colors.primaryDeep} />
        </TouchableOpacity>
        <Text style={styles.title}>Log Living Bill</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Category Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utility Category</Text>
        <View style={styles.categoryGrid}>
          {EXPENSE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = category === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryBtn, isSelected && styles.categoryBtnActive]}
                onPress={() => {
                  setCategory(cat.id);
                  setDescription(`${cat.label} Recharge`);
                }}
                activeOpacity={0.7}
              >
                <Icon size={14} color={isSelected ? '#FFFFFF' : cat.color} />
                <Text
                  style={[
                    styles.categoryBtnText,
                    isSelected && styles.categoryBtnTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Amount Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Bill Amount</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.currencyPrefix}>₦</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      {/* Description Input */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description / Note</Text>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={setDescription}
          placeholder="e.g. August IBEDC Units"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      {/* Split Calculation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Split Allocation</Text>
        <View style={styles.splitRow}>
          <TouchableOpacity
            style={[styles.splitTypeBtn, splitType === 'EQUAL' && styles.splitTypeBtnActive]}
            onPress={() => setSplitType('EQUAL')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.splitTypeText,
                splitType === 'EQUAL' && styles.splitTypeTextActive,
              ]}
            >
              Equal Split (33.3% each)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.splitTypeBtn, splitType === 'BY_RENT_SHARE' && styles.splitTypeBtnActive]}
            onPress={() => setSplitType('BY_RENT_SHARE')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.splitTypeText,
                splitType === 'BY_RENT_SHARE' && styles.splitTypeTextActive,
              ]}
            >
              By Room Share
            </Text>
          </TouchableOpacity>
        </View>

        {/* Calculation Preview Box */}
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>EACH FLATMATE'S SHARE (3 OCCUPANTS)</Text>
          <Text style={styles.previewAmount}>₦{equalShare.toLocaleString()}</Text>
          <Text style={styles.previewSub}>
            Auto-queued in Bodija 3-Bed Shared Ledger for 1-tap wallet settlement
          </Text>
        </View>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitBtn, isSubmitting && { opacity: 0.7 }]}
        onPress={handleSaveExpense}
        disabled={isSubmitting}
        activeOpacity={0.88}
      >
        <Text style={styles.submitBtnText}>
          {isSubmitting ? 'Posting Bill...' : 'Post to Household Ledger'}
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
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  categoryBtnActive: {
    backgroundColor: colors.primaryDeep,
    borderColor: colors.primaryDeep,
  },
  categoryBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  categoryBtnTextActive: {
    color: '#FFFFFF',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  currencyPrefix: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primaryDeep,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    fontSize: 14,
    color: colors.textPrimary,
  },
  splitRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  splitTypeBtn: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  splitTypeBtnActive: {
    backgroundColor: colors.primaryDeep,
    borderColor: colors.primaryDeep,
  },
  splitTypeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  splitTypeTextActive: {
    color: '#FFFFFF',
  },
  previewCard: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.warmClay,
    letterSpacing: 0.8,
  },
  previewAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.primaryDeep,
    marginVertical: 4,
    letterSpacing: -0.5,
  },
  previewSub: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
  },
  submitBtn: {
    backgroundColor: colors.primaryDeep,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

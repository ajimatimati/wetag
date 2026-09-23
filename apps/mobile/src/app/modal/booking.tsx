import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck, Wallet, Landmark, Check } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { PinDisplay } from '../../components/PinDisplay';

export default function BookingModal() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    journeyId: string;
    originAddress: string;
    destinationAddress: string;
    driverName: string;
    vehiclePlate: string;
    fareKobo: string;
  }>();

  const [seats, setSeats] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'WALLET' | 'BANK'>('WALLET');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservedPin, setReservedPin] = useState<string | null>(null);

  const baseFare = parseInt(params.fareKobo || '80000', 10);
  const totalFareNgn = (baseFare * seats) / 100;
  const safetyReserveNgn = 50; // fixed Oyo 615 safety reserve
  const finalTotalNgn = totalFareNgn + safetyReserveNgn;

  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    try {
      // In live environment, calls moveApi.reserveSeat
      const dummyPin = Math.floor(1000 + Math.random() * 9000).toString();
      setReservedPin(dummyPin);
    } catch (err: any) {
      Alert.alert('Booking Error', err.message || 'Unable to complete reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color={colors.primaryDeep} />
        </TouchableOpacity>
        <Text style={styles.title}>Reserve Seat</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Corridor Summary Card */}
      <View style={styles.corridorCard}>
        <View style={styles.routeHeader}>
          <Text style={styles.corridorTag}>CORRIDOR ROUTE</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Today · 7:15 AM</Text>
          </View>
        </View>

        <View style={styles.routeTimeline}>
          <View style={styles.routeNode}>
            <View style={[styles.dot, { backgroundColor: colors.transitBlue }]} />
            <Text style={styles.routeAddress} numberOfLines={1}>
              {params.originAddress || 'Akobo General Gas Roundabout'}
            </Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routeNode}>
            <View style={[styles.dot, { backgroundColor: colors.primaryDeep }]} />
            <Text style={styles.routeAddress} numberOfLines={1}>
              {params.destinationAddress || 'Dugbe Cocoa House Hub'}
            </Text>
          </View>
        </View>
      </View>

      {/* Driver & Vehicle Identity */}
      <View style={styles.driverInfoCard}>
        <View style={styles.driverMeta}>
          <Text style={styles.driverName}>{params.driverName || 'Dr. Kunle Alabi'}</Text>
          <Text style={styles.vehiclePlate}>
            {params.vehiclePlate || 'Toyota Corolla · OYO-412-BDJ'}
          </Text>
        </View>
        <View style={styles.verifiedBadge}>
          <ShieldCheck size={12} color={colors.primary} />
          <Text style={styles.verifiedText}>Verified Driver</Text>
        </View>
      </View>

      {/* Reserved PIN Result View */}
      {reservedPin ? (
        <View style={styles.pinResultSection}>
          <View style={styles.successPill}>
            <Check size={14} color="#FFFFFF" />
            <Text style={styles.successPillText}>Seat Confirmed</Text>
          </View>
          <Text style={styles.pinSuccessTitle}>4-Digit Drop-Off PIN</Text>
          <Text style={styles.pinSuccessSubtitle}>
            Saved offline in your weTag wallet. Show this PIN to driver only upon safe drop-off to
            release escrow funds.
          </Text>
          <PinDisplay pin={reservedPin} />
          <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.doneBtnText}>Return to Commute</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Seat Count Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Seats</Text>
            <View style={styles.seatRow}>
              {[1, 2, 3].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[styles.seatBtn, seats === num && styles.seatBtnActive]}
                  onPress={() => setSeats(num)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.seatBtnText, seats === num && styles.seatBtnTextActive]}>
                    {num} {num === 1 ? 'Seat' : 'Seats'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Payment Method Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                style={[styles.paymentCard, paymentMethod === 'WALLET' && styles.paymentCardActive]}
                onPress={() => setPaymentMethod('WALLET')}
                activeOpacity={0.7}
              >
                <Wallet
                  size={18}
                  color={paymentMethod === 'WALLET' ? colors.primaryDeep : colors.textSecondary}
                />
                <View style={styles.paymentMeta}>
                  <Text
                    style={[
                      styles.paymentName,
                      paymentMethod === 'WALLET' && styles.paymentNameActive,
                    ]}
                  >
                    Universal Wallet
                  </Text>
                  <Text style={styles.paymentSub}>Balance: ₦14,500</Text>
                </View>
                {paymentMethod === 'WALLET' && <Check size={16} color={colors.primary} />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.paymentCard, paymentMethod === 'BANK' && styles.paymentCardActive]}
                onPress={() => setPaymentMethod('BANK')}
                activeOpacity={0.7}
              >
                <Landmark
                  size={18}
                  color={paymentMethod === 'BANK' ? colors.primaryDeep : colors.textSecondary}
                />
                <View style={styles.paymentMeta}>
                  <Text
                    style={[
                      styles.paymentName,
                      paymentMethod === 'BANK' && styles.paymentNameActive,
                    ]}
                  >
                    Instant Transfer / OPay
                  </Text>
                  <Text style={styles.paymentSub}>Zero card required</Text>
                </View>
                {paymentMethod === 'BANK' && <Check size={16} color={colors.primary} />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Fee Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Summary</Text>
            <View style={styles.breakdownCard}>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>
                  Carpool Contribution ({seats} seat{seats > 1 ? 's' : ''})
                </Text>
                <Text style={styles.feeValue}>₦{totalFareNgn.toLocaleString()}</Text>
              </View>
              <View style={styles.feeRow}>
                <Text style={styles.feeLabel}>Oyo State 615 Safety Fund</Text>
                <Text style={styles.feeValue}>₦{safetyReserveNgn}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.feeRow}>
                <Text style={styles.totalLabel}>Due Now</Text>
                <Text style={styles.totalValue}>₦{finalTotalNgn.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={[styles.confirmBtn, isSubmitting && { opacity: 0.7 }]}
            onPress={handleConfirmReservation}
            disabled={isSubmitting}
            activeOpacity={0.88}
          >
            <Text style={styles.confirmBtnText}>
              {isSubmitting ? 'Securing Seat...' : `Pay ₦${finalTotalNgn.toLocaleString()} & Book Seat`}
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  corridorCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  corridorTag: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.transitBlue,
    letterSpacing: 0.8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  liveText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  routeTimeline: {
    gap: 2,
  },
  routeNode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  routeAddress: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    flex: 1,
  },
  routeLine: {
    width: 2,
    height: 14,
    backgroundColor: colors.borderSubtle,
    marginLeft: 4,
  },
  driverInfoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  driverMeta: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  vehiclePlate: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
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
  seatRow: {
    flexDirection: 'row',
    gap: 10,
  },
  seatBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  seatBtnActive: {
    backgroundColor: colors.primaryDeep,
    borderColor: colors.primaryDeep,
  },
  seatBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seatBtnTextActive: {
    color: '#FFFFFF',
  },
  paymentMethods: {
    gap: 8,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    gap: 12,
  },
  paymentCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#F0FAF6',
  },
  paymentMeta: {
    flex: 1,
  },
  paymentName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  paymentNameActive: {
    color: colors.primaryDeep,
  },
  paymentSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
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
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  confirmBtn: {
    backgroundColor: colors.primaryDeep,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  pinResultSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    gap: 10,
  },
  successPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  successPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  pinSuccessTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  pinSuccessSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 17,
  },
  doneBtn: {
    backgroundColor: colors.primaryDeep,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});

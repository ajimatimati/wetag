import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Car,
  Home,
  User,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  Snowflake,
  Luggage,
  Clock,
  Droplets,
  Zap,
  Shield,
  Upload,
  Check,
} from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useApp } from '../../context/AppContext';

type OnboardingRole = 'DRIVER' | 'RIDER' | 'PROPERTY';

export default function AuthOnboardingModal() {
  const router = useRouter();
  const { setActiveRole } = useApp();

  const [selectedRole, setSelectedRole] = useState<OnboardingRole>('DRIVER');
  const [phoneNumber, setPhoneNumber] = useState('+234 803 111 2233');
  const [otpCode, setOtpCode] = useState('739182');
  const [isOtpSent, setIsOtpSent] = useState(true);

  // Driver state
  const [carMakeModel, setCarMakeModel] = useState('Toyota Corolla (Silver)');
  const [carYear, setCarYear] = useState('2018');
  const [carPlate, setCarPlate] = useState('OYO-742-BDJ');
  const [seatsAvailable, setSeatsAvailable] = useState(3);
  const [hasAC, setHasAC] = useState(true);
  const [luggageOk, setLuggageOk] = useState(true);
  const [morningOrigin, setMorningOrigin] = useState('Akobo General Gas Roundabout');
  const [morningDest, setMorningDest] = useState('Dugbe Cocoa House Hub');
  const [morningTime, setMorningTime] = useState('7:15 AM');
  const [eveningTime, setEveningTime] = useState('5:30 PM');
  const [farePerSeat, setFarePerSeat] = useState('800');
  const [ninNumber, setNinNumber] = useState('12345678901');
  const [driverLicense, setDriverLicense] = useState('OYO-DL-2024-8891');
  const [bankName, setBankName] = useState('Wema Bank');
  const [nubanNumber, setNubanNumber] = useState('9912048821');

  // Rider state
  const [riderCorridor, setRiderCorridor] = useState('Akobo ➔ Dugbe');
  const [emergencyContact, setEmergencyContact] = useState('+234 812 445 9901');

  // Property state
  const [listerType, setListerType] = useState<'LANDLORD' | 'AGENT' | 'TENANT'>('LANDLORD');
  const [propertyTitle, setPropertyTitle] = useState('2-Bedroom Flat in Old Bodija');
  const [neighborhood, setNeighborhood] = useState('Old Bodija');
  const [propertyType, setPropertyType] = useState('2-Bedroom Flat');
  const [rentAmount, setRentAmount] = useState('700000');
  const [cautionDeposit, setCautionDeposit] = useState('50000');
  const [hasBorehole, setHasBorehole] = useState(true);
  const [hasPrepaidMeter, setHasPrepaidMeter] = useState(true);
  const [hasGenBackup, setHasGenBackup] = useState(true);
  const [hasGatedSecurity, setHasGatedSecurity] = useState(true);

  // Computations
  const parsedRent = parseFloat(rentAmount) || 0;
  const parsedCaution = parseFloat(cautionDeposit) || 0;
  const cappedLegal = Math.round(parsedRent * 0.1);
  const cappedAgency = listerType === 'LANDLORD' ? 0 : Math.round(parsedRent * 0.1);
  const totalMoveIn = parsedRent + cappedLegal + cappedAgency + parsedCaution;

  const parsedFare = parseFloat(farePerSeat) || 0;
  const weeklyFuelOffset = parsedFare * seatsAvailable * 2 * 5; // 2 trips/day, 5 days/wk

  const handleCompleteDriver = () => {
    setActiveRole('DRIVER');
    Alert.alert(
      '🚗 Car & Recurring Route Published!',
      `Your ${carMakeModel} (${carPlate}) is now listed on the ${morningOrigin} ➔ ${morningDest} corridor.\n\nEstimated Fuel Offset: ~₦${weeklyFuelOffset.toLocaleString()}/week.\nSmile ID NIN badge applied to your profile.`,
      [{ text: 'Start Driving', onPress: () => router.back() }]
    );
  };

  const handleCompleteRider = () => {
    setActiveRole('RIDER');
    Alert.alert(
      '🚶 Commuter Profile Ready!',
      `Corridor alerts enabled for ${riderCorridor}.\nEmergency trusted contact saved. Enjoy safe carpools with offline 4-digit PINs!`,
      [{ text: 'Explore Rides', onPress: () => router.back() }]
    );
  };

  const handleCompleteProperty = () => {
    setActiveRole('LANDLORD');
    Alert.alert(
      '🏡 Scam-Proof Property Published!',
      `"${propertyTitle}" in ${neighborhood} is live with a Real Move-In Total of ₦${totalMoveIn.toLocaleString()}.\n\npHash Anti-Scam Verification: PASSED (Deed & ownership audit green).`,
      [{ text: 'View Listing', onPress: () => router.back() }]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <ArrowLeft size={18} color="#0F172A" />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>Launch Onboarding</Text>
          <Text style={styles.headerSubtitle}>
            Specialised listing & verification portal
          </Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Role Segmentation Switcher */}
      <View style={styles.roleTabs}>
        <TouchableOpacity
          style={[
            styles.roleTab,
            selectedRole === 'DRIVER' && styles.roleTabActive,
          ]}
          onPress={() => setSelectedRole('DRIVER')}
          activeOpacity={0.7}
        >
          <Car
            size={16}
            color={selectedRole === 'DRIVER' ? '#00D47E' : '#64748B'}
          />
          <Text
            style={[
              styles.roleTabText,
              selectedRole === 'DRIVER' && styles.roleTabTextActive,
            ]}
          >
            Car & Route
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleTab,
            selectedRole === 'RIDER' && styles.roleTabActive,
          ]}
          onPress={() => setSelectedRole('RIDER')}
          activeOpacity={0.7}
        >
          <User
            size={16}
            color={selectedRole === 'RIDER' ? '#00D47E' : '#64748B'}
          />
          <Text
            style={[
              styles.roleTabText,
              selectedRole === 'RIDER' && styles.roleTabTextActive,
            ]}
          >
            Rider
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleTab,
            selectedRole === 'PROPERTY' && styles.roleTabActive,
          ]}
          onPress={() => setSelectedRole('PROPERTY')}
          activeOpacity={0.7}
        >
          <Home
            size={16}
            color={selectedRole === 'PROPERTY' ? '#00D47E' : '#64748B'}
          />
          <Text
            style={[
              styles.roleTabText,
              selectedRole === 'PROPERTY' && styles.roleTabTextActive,
            ]}
          >
            Property
          </Text>
        </TouchableOpacity>
      </View>

      {/* Identity Verification Banner */}
      <View style={styles.identityCard}>
        <View style={styles.identityHeader}>
          <ShieldCheck size={16} color="#00D47E" />
          <Text style={styles.identityTitle}>Smile ID Digital KYC Guard</Text>
        </View>
        <Text style={styles.identityDesc}>
          Every driver, landlord, and rider is verified against the Nigerian
          NIN database. Zero impersonation.
        </Text>
      </View>

      {/* ────────────────────────────────────────────────────────── */}
      {/* TRACK 1: DRIVER & VEHICLE LISTING */}
      {/* ────────────────────────────────────────────────────────── */}
      {selectedRole === 'DRIVER' && (
        <View style={styles.trackContainer}>
          {/* Section: Vehicle Specs */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. Vehicle Specifications</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Vehicle Make, Model & Color</Text>
              <TextInput
                style={styles.input}
                value={carMakeModel}
                onChangeText={setCarMakeModel}
                placeholder="e.g. Toyota Corolla (Silver)"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={carYear}
                  onChangeText={setCarYear}
                  keyboardType="numeric"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1.5 }]}>
                <Text style={styles.label}>License Plate</Text>
                <TextInput
                  style={styles.input}
                  value={carPlate}
                  onChangeText={setCarPlate}
                  placeholder="OYO-742-BDJ"
                  autoCapitalize="characters"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Passenger Seats to Share</Text>
              <View style={styles.stepperRow}>
                {[1, 2, 3, 4].map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.stepperBtn,
                      seatsAvailable === num && styles.stepperBtnActive,
                    ]}
                    onPress={() => setSeatsAvailable(num)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.stepperBtnText,
                        seatsAvailable === num && styles.stepperBtnTextActive,
                      ]}
                    >
                      {num} {num === 1 ? 'Seat' : 'Seats'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Comfort Toggles */}
            <View style={styles.comfortRow}>
              <TouchableOpacity
                style={[styles.toggleBtn, hasAC && styles.toggleBtnActive]}
                onPress={() => setHasAC(!hasAC)}
                activeOpacity={0.7}
              >
                <Snowflake
                  size={14}
                  color={hasAC ? '#00D47E' : '#64748B'}
                />
                <Text
                  style={[
                    styles.toggleBtnText,
                    hasAC && styles.toggleBtnTextActive,
                  ]}
                >
                  Air Conditioning (AC)
                </Text>
                {hasAC && <Check size={14} color="#00D47E" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toggleBtn, luggageOk && styles.toggleBtnActive]}
                onPress={() => setLuggageOk(!luggageOk)}
                activeOpacity={0.7}
              >
                <Luggage
                  size={14}
                  color={luggageOk ? '#00D47E' : '#64748B'}
                />
                <Text
                  style={[
                    styles.toggleBtnText,
                    luggageOk && styles.toggleBtnTextActive,
                  ]}
                >
                  Trunk Luggage OK
                </Text>
                {luggageOk && <Check size={14} color="#00D47E" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Section: Recurring Route Builder */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. Recurring Commute Schedule</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Morning Departure Hub (Origin)</Text>
              <TextInput
                style={styles.input}
                value={morningOrigin}
                onChangeText={setMorningOrigin}
                placeholder="e.g. Akobo General Gas"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Workplace / Destination Hub</Text>
              <TextInput
                style={styles.input}
                value={morningDest}
                onChangeText={setMorningDest}
                placeholder="e.g. Dugbe Cocoa House"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Morning Time</Text>
                <TextInput
                  style={styles.input}
                  value={morningTime}
                  onChangeText={setMorningTime}
                  placeholder="7:15 AM"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Evening Return</Text>
                <TextInput
                  style={styles.input}
                  value={eveningTime}
                  onChangeText={setEveningTime}
                  placeholder="5:30 PM"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Fair Fuel Share per Seat (₦)</Text>
              <TextInput
                style={styles.input}
                value={farePerSeat}
                onChangeText={setFarePerSeat}
                keyboardType="numeric"
                placeholder="800"
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Estimated Fuel Offset Callout */}
            <View style={styles.offsetCallout}>
              <Text style={styles.offsetTitle}>ESTIMATED FUEL OFFSET</Text>
              <Text style={styles.offsetAmount}>
                ~₦{weeklyFuelOffset.toLocaleString()}{' '}
                <Text style={styles.offsetSub}>/ week</Text>
              </Text>
              <Text style={styles.offsetDesc}>
                Based on {seatsAvailable} seats on daily {morningOrigin} ➔{' '}
                {morningDest} round-trips.
              </Text>
            </View>
          </View>

          {/* Section: Driver KYC & Paystack Settlement */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>3. Trust Badges & Bank Payout</Text>

            <View style={styles.inputRow}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>NIN (11 Digits)</Text>
                <TextInput
                  style={styles.input}
                  value={ninNumber}
                  onChangeText={setNinNumber}
                  keyboardType="numeric"
                  placeholder="12345678901"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1.2 }]}>
                <Text style={styles.label}>Driver License #</Text>
                <TextInput
                  style={styles.input}
                  value={driverLicense}
                  onChangeText={setDriverLicense}
                  placeholder="OYO-DL-2024-..."
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Payout Bank</Text>
                <TextInput
                  style={styles.input}
                  value={bankName}
                  onChangeText={setBankName}
                  placeholder="e.g. Wema Bank"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1.3 }]}>
                <Text style={styles.label}>NUBAN Account Number</Text>
                <TextInput
                  style={styles.input}
                  value={nubanNumber}
                  onChangeText={setNubanNumber}
                  keyboardType="numeric"
                  placeholder="9912048821"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          </View>

          {/* Submit Driver */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleCompleteDriver}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>
              Publish Car & Corridor Schedule ➔
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* TRACK 2: DAILY COMMUTER / RIDER */}
      {/* ────────────────────────────────────────────────────────── */}
      {selectedRole === 'RIDER' && (
        <View style={styles.trackContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Commuter Preferences</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Primary Daily Corridor</Text>
              <TextInput
                style={styles.input}
                value={riderCorridor}
                onChangeText={setRiderCorridor}
                placeholder="e.g. Akobo ➔ Dugbe"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Oyo 615 Emergency Trusted Contact</Text>
              <TextInput
                style={styles.input}
                value={emergencyContact}
                onChangeText={setEmergencyContact}
                keyboardType="phone-pad"
                placeholder="+234 812 ..."
                placeholderTextColor="#94A3B8"
              />
              <Text style={styles.helpText}>
                Automatically notified with live encrypted trajectory if Oyo 615
                is triggered.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleCompleteRider}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>
              Activate Commuter Alerts ➔
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* TRACK 3: PROPERTY LISTER (LANDLORD / AGENT / TENANT) */}
      {/* ────────────────────────────────────────────────────────── */}
      {selectedRole === 'PROPERTY' && (
        <View style={styles.trackContainer}>
          {/* Lister Role Switcher */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. Lister Classification</Text>
            <View style={styles.subRoleRow}>
              {(['LANDLORD', 'AGENT', 'TENANT'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.subRoleBtn,
                    listerType === type && styles.subRoleBtnActive,
                  ]}
                  onPress={() => setListerType(type)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.subRoleBtnText,
                      listerType === type && styles.subRoleBtnTextActive,
                    ]}
                  >
                    {type === 'LANDLORD'
                      ? 'Direct Owner'
                      : type === 'AGENT'
                      ? 'Verified Agent'
                      : 'Relocating Tenant'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Property Core Specs */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. Apartment Details</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Listing Title</Text>
              <TextInput
                style={styles.input}
                value={propertyTitle}
                onChangeText={setPropertyTitle}
                placeholder="e.g. Modern 2-Bedroom Flat in Old Bodija"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.fieldGroup, { flex: 1.2 }]}>
                <Text style={styles.label}>Neighborhood</Text>
                <TextInput
                  style={styles.input}
                  value={neighborhood}
                  onChangeText={setNeighborhood}
                  placeholder="Old Bodija"
                  placeholderTextColor="#94A3B8"
                />
              </View>
              <View style={[styles.fieldGroup, { flex: 1 }]}>
                <Text style={styles.label}>Type</Text>
                <TextInput
                  style={styles.input}
                  value={propertyType}
                  onChangeText={setPropertyType}
                  placeholder="2-Bed Flat"
                  placeholderTextColor="#94A3B8"
                />
              </View>
            </View>
          </View>

          {/* OpenRent Radical Price Transparency */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              3. Radical Price Transparency (OpenRent Standard)
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Annual Base Rent (₦)</Text>
              <TextInput
                style={styles.input}
                value={rentAmount}
                onChangeText={setRentAmount}
                keyboardType="numeric"
                placeholder="700000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Refundable Caution Deposit (₦)</Text>
              <TextInput
                style={styles.input}
                value={cautionDeposit}
                onChangeText={setCautionDeposit}
                keyboardType="numeric"
                placeholder="50000"
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Real Move-In Calculation Card */}
            <View style={styles.priceBreakdownCard}>
              <View style={styles.priceHeader}>
                <Text style={styles.priceHeaderLabel}>
                  REAL MOVE-IN TOTAL COMMITMENT
                </Text>
                <Text style={styles.noExtortionBadge}>No Hidden Extortion</Text>
              </View>

              <Text style={styles.grandTotal}>
                ₦{totalMoveIn.toLocaleString()}
              </Text>

              <View style={styles.breakdownList}>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItem}>Annual Rent:</Text>
                  <Text style={styles.breakdownVal}>
                    ₦{parsedRent.toLocaleString()}
                  </Text>
                </View>
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItem}>Legal Agreement (10% capped):</Text>
                  <Text style={styles.breakdownVal}>
                    ₦{cappedLegal.toLocaleString()}
                  </Text>
                </View>
                {listerType !== 'LANDLORD' && (
                  <View style={styles.breakdownRow}>
                    <Text style={styles.breakdownItem}>Agency Fee (10% capped):</Text>
                    <Text style={styles.breakdownVal}>
                      ₦{cappedAgency.toLocaleString()}
                    </Text>
                  </View>
                )}
                <View style={styles.breakdownRow}>
                  <Text style={styles.breakdownItem}>Refundable Caution Escrow:</Text>
                  <Text style={styles.breakdownVal}>
                    ₦{parsedCaution.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Nigerian Infrastructure Truth Checklist */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>4. Ibadan Living Truth Audit</Text>

            <View style={styles.checklist}>
              <TouchableOpacity
                style={[styles.checkItem, hasBorehole && styles.checkItemActive]}
                onPress={() => setHasBorehole(!hasBorehole)}
                activeOpacity={0.7}
              >
                <Droplets size={16} color={hasBorehole ? '#00D47E' : '#64748B'} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>24/7 Deep Borehole Pump</Text>
                  <Text style={styles.checkDesc}>Continuous running water supply</Text>
                </View>
                {hasBorehole && <CheckCircle2 size={16} color="#00D47E" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkItem,
                  hasPrepaidMeter && styles.checkItemActive,
                ]}
                onPress={() => setHasPrepaidMeter(!hasPrepaidMeter)}
                activeOpacity={0.7}
              >
                <Zap size={16} color={hasPrepaidMeter ? '#00D47E' : '#64748B'} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>Dedicated Prepaid Meter</Text>
                  <Text style={styles.checkDesc}>Band B IBEDC grid connection</Text>
                </View>
                {hasPrepaidMeter && <CheckCircle2 size={16} color="#00D47E" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.checkItem, hasGenBackup && styles.checkItemActive]}
                onPress={() => setHasGenBackup(!hasGenBackup)}
                activeOpacity={0.7}
              >
                <Clock size={16} color={hasGenBackup ? '#00D47E' : '#64748B'} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>Generator Back-Up Schedule</Text>
                  <Text style={styles.checkDesc}>Daily 7:00 PM – 6:00 AM</Text>
                </View>
                {hasGenBackup && <CheckCircle2 size={16} color="#00D47E" />}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.checkItem,
                  hasGatedSecurity && styles.checkItemActive,
                ]}
                onPress={() => setHasGatedSecurity(!hasGatedSecurity)}
                activeOpacity={0.7}
              >
                <Shield
                  size={16}
                  color={hasGatedSecurity ? '#00D47E' : '#64748B'}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTitle}>Gated Estate Checkpoint</Text>
                  <Text style={styles.checkDesc}>24-hour manned physical security</Text>
                </View>
                {hasGatedSecurity && <CheckCircle2 size={16} color="#00D47E" />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Deed Verification & pHash Status */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>5. Anti-Scam Deed Audit</Text>
            <View style={styles.phashBox}>
              <ShieldCheck size={16} color="#00D47E" />
              <View style={{ flex: 1 }}>
                <Text style={styles.phashTitle}>
                  pHash Anti-Duplicate Scan: PASSED
                </Text>
                <Text style={styles.phashDesc}>
                  Listing verified against Oyo State Land Registry records.
                  Duplicate agent spam is prohibited.
                </Text>
              </View>
            </View>
          </View>

          {/* Submit Property */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleCompleteProperty}
            activeOpacity={0.88}
          >
            <Text style={styles.primaryBtnText}>
              Publish Scam-Proof Listing ➔
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  roleTabs: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    padding: 4,
    borderRadius: 16,
    marginBottom: 16,
    gap: 4,
  },
  roleTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
  },
  roleTabActive: {
    backgroundColor: '#0A0D16',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  roleTabTextActive: {
    color: '#FFFFFF',
  },
  identityCard: {
    backgroundColor: '#0A0D16',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
  },
  identityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  identityTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#00D47E',
  },
  identityDesc: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 16,
  },
  trackContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stepperRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stepperBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  stepperBtnActive: {
    backgroundColor: '#0A0D16',
    borderColor: '#0A0D16',
  },
  stepperBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  stepperBtnTextActive: {
    color: '#FFFFFF',
  },
  comfortRow: {
    gap: 8,
    marginTop: 6,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toggleBtnActive: {
    borderColor: 'rgba(0, 212, 126, 0.4)',
    backgroundColor: 'rgba(0, 212, 126, 0.05)',
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    flex: 1,
    marginLeft: 8,
  },
  toggleBtnTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  offsetCallout: {
    backgroundColor: '#0A0D16',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  offsetTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00D47E',
    letterSpacing: 0.8,
  },
  offsetAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 4,
  },
  offsetSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
  },
  offsetDesc: {
    fontSize: 11,
    color: '#94A3B8',
    lineHeight: 15,
  },
  primaryBtn: {
    backgroundColor: '#0A0D16',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  primaryBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  helpText: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 4,
  },
  subRoleRow: {
    flexDirection: 'row',
    gap: 8,
  },
  subRoleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subRoleBtnActive: {
    backgroundColor: '#0A0D16',
    borderColor: '#0A0D16',
  },
  subRoleBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  subRoleBtnTextActive: {
    color: '#FFFFFF',
  },
  priceBreakdownCard: {
    backgroundColor: '#0A0D16',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceHeaderLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00D47E',
    letterSpacing: 0.8,
  },
  noExtortionBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  grandTotal: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    marginVertical: 6,
  },
  breakdownList: {
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingTop: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownItem: {
    fontSize: 11,
    color: '#94A3B8',
  },
  breakdownVal: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checklist: {
    gap: 8,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  checkItemActive: {
    borderColor: 'rgba(0, 212, 126, 0.4)',
    backgroundColor: 'rgba(0, 212, 126, 0.04)',
  },
  checkTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  checkDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 1,
  },
  phashBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  phashTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#166534',
  },
  phashDesc: {
    fontSize: 10,
    color: '#15803D',
    marginTop: 2,
    lineHeight: 14,
  },
});

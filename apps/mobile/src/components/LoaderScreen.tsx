import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldCheck, Compass, Radio } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface LoaderScreenProps {
  onFinish: () => void;
}

const TELEMETRY_STEPS = [
  { text: 'Initializing Ibadan Local Life Grid...', status: 'OK' },
  { text: 'Syncing Akobo ➔ Dugbe & UI ➔ Secretariat Corridors...', status: 'ACTIVE' },
  { text: 'Connecting Oyo State 615 Civic Emergency Dispatch...', status: 'ONLINE' },
  { text: 'Audit Complete · 100% Launch Ready 🚀', status: 'READY' },
];

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStep(1);
      setProgress(45);
    }, 400);

    const timer2 = setTimeout(() => {
      setCurrentStep(2);
      setProgress(75);
    }, 800);

    const timer3 = setTimeout(() => {
      setCurrentStep(3);
      setProgress(100);
    }, 1200);

    const finishTimer = setTimeout(() => {
      onFinish();
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <View style={styles.container}>
      {/* Background Radial Halo Simulation */}
      <View style={styles.haloGlow} />

      {/* Brand Icon Header */}
      <View style={styles.brandContainer}>
        <View style={styles.iconRing}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoLetter}>W</Text>
          </View>
        </View>

        <Text style={styles.brandTitle}>weTag</Text>
        <Text style={styles.brandSubtitle}>
          Ibadan Local Life Operating Network
        </Text>
      </View>

      {/* Telemetry Status Console */}
      <View style={styles.consoleCard}>
        <View style={styles.consoleHeader}>
          <View style={styles.liveIndicator}>
            <Radio size={12} color={colors.primary} />
            <Text style={styles.consoleHeaderText}>TELEMETRY LINK</Text>
          </View>
          <Text style={styles.latencyText}>12ms · 5G</Text>
        </View>

        <View style={styles.stepList}>
          {TELEMETRY_STEPS.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;

            return (
              <View key={idx} style={styles.stepRow}>
                <View
                  style={[
                    styles.stepDot,
                    isCompleted && styles.stepDotCompleted,
                    isCurrent && styles.stepDotActive,
                  ]}
                />
                <Text
                  style={[
                    styles.stepText,
                    isCompleted && styles.stepTextCompleted,
                    isCurrent && styles.stepTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {step.text}
                </Text>
                {isCompleted && (
                  <Text style={styles.statusPill}>{step.status}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      {/* Quick Skip Button */}
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={onFinish}
        activeOpacity={0.8}
      >
        <Text style={styles.skipBtnText}>Launch Experience ➔</Text>
      </TouchableOpacity>

      {/* Bottom Trust Lock */}
      <View style={styles.footerLock}>
        <ShieldCheck size={13} color="#64748B" />
        <Text style={styles.footerText}>
          Oyo State Civic Shield & Paystack Double-Entry Verified
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D16',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    position: 'relative',
  },
  haloGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(0, 212, 126, 0.08)',
    top: '25%',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  iconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#111622',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 212, 126, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#00D47E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  logoBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#00D47E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    fontSize: 32,
    fontWeight: '900',
    color: '#090D16',
    letterSpacing: -1,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  consoleCard: {
    width: '100%',
    backgroundColor: '#111622',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 24,
  },
  consoleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  consoleHeaderText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#00D47E',
    letterSpacing: 1,
  },
  latencyText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
  },
  stepList: {
    gap: 12,
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#334155',
  },
  stepDotCompleted: {
    backgroundColor: '#00D47E',
  },
  stepDotActive: {
    backgroundColor: '#00D47E',
    transform: [{ scale: 1.3 }],
  },
  stepText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
    flex: 1,
  },
  stepTextCompleted: {
    color: '#94A3B8',
  },
  stepTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statusPill: {
    fontSize: 9,
    fontWeight: '800',
    color: '#00D47E',
    backgroundColor: 'rgba(0, 212, 126, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00D47E',
    borderRadius: 2,
  },
  skipBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: 24,
  },
  skipBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  footerLock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
  },
});

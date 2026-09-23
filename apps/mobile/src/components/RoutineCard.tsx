import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, ArrowRight } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface RoutineCardProps {
  origin?: string;
  originSub?: string;
  destination?: string;
  destinationSub?: string;
  timeTarget?: string;
  duration?: string;
  matchCount?: number;
  fare?: string;
  onPress?: () => void;
}

export const RoutineCard: React.FC<RoutineCardProps> = ({
  origin = 'Akobo',
  originSub = 'General Gas Bus Stop',
  destination = 'Dugbe',
  destinationSub = 'Cocoa House Hub',
  timeTarget = '7:15 AM target',
  duration = '28 mins',
  matchCount = 2,
  fare = '₦800',
  onPress,
}) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/move');
    }
  };

  return (
    <View style={styles.card}>
      {/* Top Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.routineBadge}>
          <Clock size={14} color={colors.primary} />
          <Text style={styles.routineTitle}>YOUR MORNING ROUTINE</Text>
        </View>
        <View style={styles.timePill}>
          <Text style={styles.timePillText}>{timeTarget}</Text>
        </View>
      </View>

      {/* Transit Line Visual */}
      <View style={styles.transitBox}>
        <View style={styles.timelineCol}>
          <View style={styles.dotOrigin} />
          <View style={styles.timelineBar} />
          <View style={styles.dotDest} />
        </View>

        <View style={styles.nodesCol}>
          <View style={styles.nodeItem}>
            <Text style={styles.nodePrimary} numberOfLines={1}>{origin}</Text>
            <Text style={styles.nodeSecondary} numberOfLines={1}>{originSub}</Text>
          </View>
          <View style={[styles.nodeItem, { marginTop: 12 }]}>
            <Text style={styles.nodePrimary} numberOfLines={1}>{destination}</Text>
            <Text style={styles.nodeSecondary} numberOfLines={1}>{destinationSub}</Text>
          </View>
        </View>

        <View style={styles.metricsCol}>
          <Text style={styles.metricLabel}>Est. transit</Text>
          <Text style={styles.metricValue}>{duration}</Text>
          <Text style={styles.fareTag}>{fare}</Text>
        </View>
      </View>

      {/* Action Footer */}
      <View style={styles.footerRow}>
        <View style={styles.matchAvatars}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.surfaceContainerLow }]}>
            <Text style={styles.avatarText}>KA</Text>
          </View>
          <View style={[styles.avatarCircle, { backgroundColor: '#E0F2FE', marginLeft: -8 }]}>
            <Text style={[styles.avatarText, { color: colors.move.transitBlue }]}>SO</Text>
          </View>
          <Text style={styles.matchText} numberOfLines={1}>
            {matchCount} matching rides
          </Text>
        </View>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={handlePress}
          activeOpacity={0.88}
        >
          <Text style={styles.actionBtnText}>Find my ride</Text>
          <ArrowRight size={15} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#123C3A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  routineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routineTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.8,
  },
  timePill: {
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 9999,
  },
  timePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  transitBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  timelineCol: {
    alignItems: 'center',
    width: 14,
    marginRight: 10,
  },
  dotOrigin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primaryDeep,
  },
  timelineBar: {
    width: 2,
    height: 24,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  dotDest: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.move.transitBlue,
  },
  nodesCol: {
    flex: 1,
    paddingRight: 8,
  },
  nodeItem: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  nodePrimary: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  nodeSecondary: {
    fontSize: 12,
    color: colors.textSecondary,
    flexShrink: 1,
  },
  metricsCol: {
    alignItems: 'flex-end',
  },
  metricLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  fareTag: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.move.transitBlue,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchAvatars: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primaryDeep,
  },
  matchText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 8,
    flexShrink: 1,
  },
  actionBtn: {
    backgroundColor: colors.primaryDeep,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

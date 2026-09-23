import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Shield, Car, Home, ChevronRight, Lock } from 'lucide-react-native';
import { colors } from '../../theme/colors';

type FilterType = 'ALL' | 'MOVE' | 'STAY';

interface ChatItem {
  id: string;
  name: string;
  context: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  domain: 'MOVE' | 'STAY';
  avatarInitials: string;
}

const CHAT_ITEMS: ChatItem[] = [
  {
    id: '1',
    name: 'Dr. Kunle Alabi',
    context: 'Akobo ➔ Dugbe · 7:15 AM Carpool',
    lastMessage: 'Approaching General Gas roundabout now. 3 mins away.',
    time: '7:28 AM',
    unreadCount: 1,
    domain: 'MOVE',
    avatarInitials: 'KA',
  },
  {
    id: '2',
    name: 'Bodija 3-Bed Ledger',
    context: 'Shared Flat · Unit 4B',
    lastMessage: 'Ada logged IBEDC power bill for August: ₦18,400.',
    time: 'Yesterday',
    unreadCount: 2,
    domain: 'STAY',
    avatarInitials: 'BL',
  },
  {
    id: '3',
    name: 'Engr. Femi Adeleke',
    context: '2-Bed Flat, Old Bodija',
    lastMessage: 'Physical inspection confirmed for Saturday 11:00 AM.',
    time: '2d ago',
    unreadCount: 0,
    domain: 'STAY',
    avatarInitials: 'FA',
  },
  {
    id: '4',
    name: 'Bose Adewale',
    context: 'UI Agbowo ➔ Secretariat',
    lastMessage: 'Thanks for the ride! Dropped off at Gate 2 safely.',
    time: 'Sep 19',
    unreadCount: 0,
    domain: 'MOVE',
    avatarInitials: 'BA',
  },
];

export default function MessagesScreen() {
  const [filter, setFilter] = useState<FilterType>('ALL');

  const filteredChats = CHAT_ITEMS.filter((item) => {
    if (filter === 'ALL') return true;
    return item.domain === filter;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>End-to-end encrypted · Masked contacts</Text>
      </View>

      {/* Masked Privacy Guarantee */}
      <View style={styles.privacyBanner}>
        <View style={styles.privacyIconWrap}>
          <Lock size={15} color={colors.primaryDeep} />
        </View>
        <View style={styles.privacyContent}>
          <Text style={styles.privacyTitle}>Zero Phone Number Leaks</Text>
          <Text style={styles.privacyDesc}>
            All calls & chats route through weTag relays. Your phone stays private.
          </Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterPill, filter === 'ALL' && styles.filterPillActive]}
          onPress={() => setFilter('ALL')}
        >
          <Text style={[styles.filterText, filter === 'ALL' && styles.filterTextActive]}>
            All ({CHAT_ITEMS.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterPill, filter === 'MOVE' && styles.filterPillActive]}
          onPress={() => setFilter('MOVE')}
        >
          <Car size={13} color={filter === 'MOVE' ? '#FFFFFF' : colors.transitBlue} />
          <Text style={[styles.filterText, filter === 'MOVE' && styles.filterTextActive]}>
            Carpools
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterPill, filter === 'STAY' && styles.filterPillActive]}
          onPress={() => setFilter('STAY')}
        >
          <Home size={13} color={filter === 'STAY' ? '#FFFFFF' : colors.warmClay} />
          <Text style={[styles.filterText, filter === 'STAY' && styles.filterTextActive]}>
            Households
          </Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <View style={styles.chatList}>
        {filteredChats.map((chat) => {
          const isMove = chat.domain === 'MOVE';
          return (
            <TouchableOpacity key={chat.id} style={styles.chatCard} activeOpacity={0.7}>
              {/* Avatar with domain indicator */}
              <View style={styles.avatarContainer}>
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: isMove ? colors.move.transitLight : colors.stay.accentLight,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.avatarText,
                      { color: isMove ? colors.transitBlue : colors.warmClay },
                    ]}
                  >
                    {chat.avatarInitials}
                  </Text>
                </View>
                <View
                  style={[
                    styles.domainDot,
                    { backgroundColor: isMove ? colors.transitBlue : colors.warmClay },
                  ]}
                >
                  {isMove ? (
                    <Car size={9} color="#FFFFFF" />
                  ) : (
                    <Home size={9} color="#FFFFFF" />
                  )}
                </View>
              </View>

              {/* Chat details */}
              <View style={styles.chatInfo}>
                <View style={styles.chatTopRow}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <Text style={styles.chatContext} numberOfLines={1}>
                  {chat.context}
                </Text>
                <View style={styles.messageBottomRow}>
                  <Text
                    style={[
                      styles.lastMessage,
                      chat.unreadCount > 0 && styles.unreadMessage,
                    ]}
                    numberOfLines={1}
                  >
                    {chat.lastMessage}
                  </Text>
                  {chat.unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>{chat.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
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
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.primaryDeep,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  privacyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  privacyIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryDeep,
  },
  privacyDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  filterPillActive: {
    backgroundColor: colors.primaryDeep,
    borderColor: colors.primaryDeep,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  chatList: {
    gap: 10,
  },
  chatCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
  },
  domainDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatInfo: {
    flex: 1,
  },
  chatTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chatTime: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  chatContext: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  messageBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 12,
    color: colors.textSecondary,
    flex: 1,
  },
  unreadMessage: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});

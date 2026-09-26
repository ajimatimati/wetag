/**
 * weTag Luxury Design System — Colors (Canonical Mobile Tokens)
 * High-precision Obsidian Carbon & Crisp Slate architecture.
 * Clean, modern luxury aesthetic inspired by Linear, Apple, Uber Black, and Stripe.
 */

export const colors = {
  // Brand Core — High-Precision Electric Mint & Deep Obsidian Carbon
  primary: '#00D47E',
  primaryDeep: '#0A0D16',
  primaryLight: '#E6FAF2',
  carbon: '#0A0D16',
  carbonDark: '#05070B',
  carbonCard: '#111622',
  electricMint: '#00D47E',
  electricCobalt: '#2563EB',
  amberGold: '#F59E0B',

  // Product Accents
  move: {
    accent: '#00D47E',
    accentLight: '#E6FAF2',
    accentDeep: '#0F172A',
    transitBlue: '#2563EB',
    transitLight: '#EFF6FF',
    surface: '#F8FAFC',
    subtle: '#F1F5F9',
  },
  moveAccent: '#00D47E',
  moveAccentHover: '#00BA6E',
  moveSurface: '#F8FAFC',
  moveSubtle: '#F1F5F9',
  transitBlue: '#2563EB',

  stay: {
    accent: '#0F172A',
    accentLight: '#F1F5F9',
    accentDeep: '#0A0D16',
    warmClay: '#C87943',
    clay: '#B45309',
    clayLight: '#FEF3C7',
    surface: '#F8FAFC',
    subtle: '#F1F5F9',
  },
  stayAccent: '#0F172A',
  stayAccentHover: '#1E293B',
  staySurface: '#F8FAFC',
  staySubtle: '#F1F5F9',
  warmClay: '#C87943',

  // Semantic
  success: '#00D47E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#2563EB',

  // Surfaces — Crisp Slate & Porcelain Neutral (Zero Muddy Green Cast)
  porcelain: '#F8FAFC',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceCard: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  surfaceMuted: '#E2E8F0',
  surfaceContainerLow: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderSubtle: 'rgba(0, 0, 0, 0.06)',
  borderMuted: '#CBD5E1',

  // Text — Razor-Sharp Pitch Slate & Neutral Hierarchy
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#FFFFFF',
  textDisabled: '#CBD5E1',

  // Safety & Emergency
  safety: {
    sos: '#EF4444',
    coral: '#EF4444',
    shield: '#0A0D16',
    emergency: '#EF4444',
    sosBackground: '#FEF2F2',
    verified: '#00D47E',
    unverified: '#F59E0B',
    warning: '#F97316',
    success: '#00D47E',
    pin: '#0A0D16',
    pinBackground: '#0A0D16',
    pinText: '#FFFFFF',
  },
  safetyEmergency: '#EF4444',
  safetyWarning: '#F97316',
  safetySuccess: '#00D47E',
  pinBackground: '#0A0D16',
  pinText: '#FFFFFF',

  // Interactive
  disabled: '#E2E8F0',
  disabledText: '#94A3B8',
  overlay: 'rgba(10, 13, 22, 0.65)',
};

export const colorsDark = {
  ...colors,
  primary: '#00D47E',
  primaryDeep: '#FFFFFF',
  primaryLight: '#111827',

  move: {
    accent: '#00D47E',
    accentLight: '#111827',
    accentDeep: '#00D47E',
    transitBlue: '#3B82F6',
    transitLight: '#1E293B',
    surface: '#0F172A',
    subtle: '#1E293B',
  },
  stay: {
    accent: '#94A3B8',
    accentLight: '#1E293B',
    accentDeep: '#CBD5E1',
    warmClay: '#F59E0B',
    clay: '#F59E0B',
    clayLight: '#332308',
    surface: '#0F172A',
    subtle: '#1E293B',
  },

  success: '#00D47E',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',

  background: '#090C15',
  surface: '#0F172A',
  surfaceElevated: '#1E293B',
  surfaceCard: '#111622',
  surfaceSubtle: '#1E293B',
  border: '#1E293B',
  borderLight: '#334155',

  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textInverse: '#0F172A',
};

export type Colors = typeof colors;
export type ColorsDark = typeof colorsDark;

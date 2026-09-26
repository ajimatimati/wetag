// packages/ui-kit/colors.ts
// weTag Luxury Design Tokens — Color System
// High-precision Obsidian Carbon & Crisp Slate architecture.

export const colors = {
  // ── Brand Core ──
  primary:          '#00D47E',  // Precision Electric Mint
  primaryDeep:      '#0A0D16',  // Deep Obsidian Carbon
  primaryLight:     '#E6FAF2',  // Electric Mint Tint

  // ── Product Accents ──
  move: {
    accent:         '#00D47E',  // Electric Mint
    accentLight:    '#E6FAF2',
    accentDeep:     '#0F172A',
    transitBlue:    '#2563EB',  // Electric Cobalt
    transitLight:   '#EFF6FF',
  },
  stay: {
    accent:         '#0F172A',  // Clean Slate Carbon
    accentLight:    '#F1F5F9',
    accentDeep:     '#0A0D16',
    warmClay:       '#C87943',
    clay:           '#B45309',
    clayLight:      '#FEF3C7',
  },

  // ── Semantic ──
  success:          '#00D47E',
  warning:          '#F59E0B',
  danger:           '#EF4444',
  info:             '#2563EB',

  // ── Surfaces ──
  porcelain:        '#F8FAFC',  // Crisp Neutral Slate-50 Canvas
  background:       '#F8FAFC',
  surface:          '#FFFFFF',  // Crisp White Cards
  surfaceElevated:  '#FFFFFF',
  surfaceSubtle:    '#F1F5F9',
  surfaceContainerLow: '#F1F5F9',
  border:           '#E2E8F0',  // Hairline Slate-200
  borderLight:      '#F1F5F9',
  borderSubtle:     'rgba(0, 0, 0, 0.06)',

  // ── Text ──
  textPrimary:      '#0F172A',  // Slate-900 Razor-Sharp Pitch
  textSecondary:    '#64748B',  // Slate-500 Clean Neutral
  textTertiary:     '#94A3B8',
  textMuted:        '#64748B',
  textInverse:      '#FFFFFF',
  textDisabled:     '#CBD5E1',

  // ── Safety ──
  safety: {
    sos:            '#EF4444',  // Emergency 615 hotline
    coral:          '#EF4444',
    shield:         '#0A0D16',
    sosBackground:  '#FEF2F2',
    verified:       '#00D47E',
    unverified:     '#F59E0B',
    pin:            '#0A0D16',
    pinBackground:  '#0A0D16',
  },

  // ── Interactive ──
  disabled:         '#E2E8F0',
  disabledText:     '#94A3B8',
  overlay:          'rgba(10, 13, 22, 0.65)',
} as const;

export const colorsDark = {
  primary:          '#00D47E',
  primaryDeep:      '#FFFFFF',
  primaryLight:     '#111827',

  move: {
    accent:         '#00D47E',
    accentLight:    '#111827',
    accentDeep:     '#00D47E',
  },
  stay: {
    accent:         '#94A3B8',
    accentLight:    '#1E293B',
    accentDeep:     '#CBD5E1',
    clay:           '#F59E0B',
    clayLight:      '#332308',
  },

  success:          '#00D47E',
  warning:          '#F59E0B',
  danger:           '#EF4444',
  info:             '#3B82F6',

  background:       '#090C15',
  surface:          '#0F172A',
  surfaceElevated:  '#1E293B',
  surfaceSubtle:    '#1E293B',
  border:           '#1E293B',
  borderLight:      '#334155',

  textPrimary:      '#F8FAFC',
  textSecondary:    '#94A3B8',
  textTertiary:     '#64748B',
  textInverse:      '#0F172A',
  textDisabled:     '#475569',

  safety: {
    sos:            '#EF4444',
    sosBackground:  '#3D1414',
    verified:       '#00D47E',
    unverified:     '#F59E0B',
    pin:            '#F8FAFC',
    pinBackground:  '#111622',
  },

  disabled:         '#1E293B',
  disabledText:     '#475569',
  overlay:          'rgba(0, 0, 0, 0.85)',
} as const;

export type Colors = typeof colors;
export type ColorsDark = typeof colorsDark;

// packages/ui-kit/colors.ts
// weTag Design Tokens — Color System
// Two products, one identity. MOVE = teal energy. STAY = warm sage comfort.

// ─────────────────────────────────────────────
// LIGHT MODE (Default)
// ─────────────────────────────────────────────

export const colors = {
  // ── Brand Core ──
  primary:          '#18B88A',  // Soft Teal — the platform identity
  primaryDeep:      '#123C3A',  // Deep Blue-Green — authority, trust, text
  primaryLight:     '#E5F7F0',  // Soft Mint — success states, highlights

  // ── Product Accents ──
  move: {
    accent:         '#18B88A',  // Teal — energy, movement, routes
    accentLight:    '#D4F5E9',  // Light teal surface
    accentDeep:     '#0F8A66',  // Dark teal for pressed states
    transitBlue:    '#2563EB',  // Electric Transit Blue for routes & icons
    transitLight:   '#EFF6FF',  // Light transit blue container
  },
  stay: {
    accent:         '#8FA888',  // Warm Sage — home, comfort, stability
    accentLight:    '#EDF2EB',  // Light sage surface
    accentDeep:     '#6B8563',  // Dark sage for pressed states
    warmClay:       '#C87943',  // Warm Clay / Housing Amber — radical pricing
    clay:           '#C4A882',  // Soft Clay — warmth, earthiness (secondary)
    clayLight:      '#F5EDE3',  // Light clay surface
  },

  // ── Semantic ──
  success:          '#18B88A',
  warning:          '#E8A62B',  // Warm Golden — alerts, CTAs, fare highlights
  danger:           '#EF4444',  // Coral Red — strictly for emergency SOS / 615 call
  info:             '#2563EB',  // Transit Blue — informational banners

  // ── Surfaces ──
  porcelain:        '#F7FAF8',  // Warm off-white canvas
  background:       '#F7FAF8',  // Off-white with the faintest green warmth
  surface:          '#FFFFFF',  // Cards, sheets
  surfaceElevated:  '#FFFFFF',  // Elevated cards (differentiated by shadow)
  surfaceSubtle:    '#F0F4F1',  // Muted sections, dividers
  surfaceContainerLow: '#EEF5F2', // Soft tinted container
  border:           '#E2E8E4',  // Default border
  borderLight:      '#F0F4F1',  // Subtle separator
  borderSubtle:     '#E2EBE6',  // Hairline division for cards

  // ── Text ──
  textPrimary:      '#161D1B',  // Charcoal — body text, headings
  textSecondary:    '#5A6B68',  // Muted green-gray — captions, labels
  textTertiary:     '#8A9B97',  // Placeholder text
  textMuted:        '#717978',  // Secondary glanceable metadata
  textInverse:      '#FFFFFF',  // Text on dark/colored backgrounds
  textDisabled:     '#B8C5C2',  // Disabled controls

  // ── Safety ──
  safety: {
    sos:            '#EF4444',  // Emergency 615 hotline
    coral:          '#EF4444',  // Emergency Coral
    shield:         '#123C3A',  // Calm neutral safety shield
    sosBackground:  '#FDF0EF',  // Emergency banner background
    verified:       '#18B88A',  // Verification badges
    unverified:     '#E8A62B',  // Needs attention
    pin:            '#123C3A',  // Trip PIN display — maximum contrast
    pinBackground:  '#E5F7F0',
  },

  // ── Interactive ──
  disabled:         '#D1D9D6',
  disabledText:     '#A0ADA9',
  overlay:          'rgba(18, 60, 58, 0.6)',  // Modal/sheet backdrop
} as const;

// ─────────────────────────────────────────────
// DARK MODE
// ─────────────────────────────────────────────

export const colorsDark = {
  primary:          '#2ED9A4',  // Brighter teal for dark backgrounds
  primaryDeep:      '#E5F7F0',  // Inverted — now used for text
  primaryLight:     '#1A3D38',  // Dark mint — subtle container

  move: {
    accent:         '#2ED9A4',
    accentLight:    '#1A3D38',
    accentDeep:     '#18B88A',
  },
  stay: {
    accent:         '#A8C29F',
    accentLight:    '#1E2D1B',
    accentDeep:     '#8FA888',
    clay:           '#D4BC9E',
    clayLight:      '#2A2318',
  },

  success:          '#2ED9A4',
  warning:          '#F0B840',
  danger:           '#F07570',
  info:             '#5BA0D9',

  background:       '#0F1514',  // Very dark green-black
  surface:          '#1A2422',  // Card surfaces
  surfaceElevated:  '#223230',  // Elevated cards
  surfaceSubtle:    '#162120',
  border:           '#2A3936',
  borderLight:      '#1E2B29',

  textPrimary:      '#E8F0EE',
  textSecondary:    '#9AABA7',
  textTertiary:     '#6B7D79',
  textInverse:      '#172322',
  textDisabled:     '#4A5B57',

  safety: {
    sos:            '#F07570',
    sosBackground:  '#3D1A18',
    verified:       '#2ED9A4',
    unverified:     '#F0B840',
    pin:            '#E5F7F0',
    pinBackground:  '#1A3D38',
  },

  disabled:         '#2A3936',
  disabledText:     '#4A5B57',
  overlay:          'rgba(0, 0, 0, 0.7)',
} as const;

// ─────────────────────────────────────────────
// TYPE EXPORTS
// ─────────────────────────────────────────────

export type Colors = typeof colors;
export type ColorsDark = typeof colorsDark;

// packages/ui-kit/typography.ts
// weTag Design Tokens — Typography, Spacing, Shape & Elevation

// ─────────────────────────────────────────────
// TYPOGRAPHY
// ─────────────────────────────────────────────

export const fontFamily = {
  primary:  '"Inter", "Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  mono:     '"JetBrains Mono", "Fira Code", monospace',
} as const;

export const fontWeight = {
  regular:    '400',
  medium:     '500',
  semibold:   '600',
  bold:       '700',
} as const;

export const fontSize = {
  xs:     12,   // Tiny labels, badges
  sm:     14,   // Captions, secondary text
  base:   16,   // Body text, input fields
  lg:     18,   // Subheadings, card titles
  xl:     20,   // Section headers
  '2xl':  24,   // Page titles, fare amounts
  '3xl':  28,   // Hero numbers (₦3,200)
  '4xl':  32,   // Onboarding headlines
} as const;

export const lineHeight = {
  tight:    1.2,  // Headlines
  normal:   1.5,  // Body text
  relaxed:  1.6,  // Long-form content
} as const;

// ─────────────────────────────────────────────
// SPACING (4px base unit)
// ─────────────────────────────────────────────

export const spacing = {
  '0':    0,
  '1':    4,
  '2':    8,
  '3':    12,
  '4':    16,
  '5':    20,
  '6':    24,
  '7':    28,
  '8':    32,
  '10':   40,
  '12':   48,
  '16':   64,
  '20':   80,
} as const;

// ─────────────────────────────────────────────
// SHAPE
// ─────────────────────────────────────────────

export const borderRadius = {
  none:   0,
  sm:     8,    // Subtle rounding — inputs, chips
  md:     12,   // Cards, buttons
  lg:     16,   // Bottom sheets, modal corners
  xl:     20,   // Large cards, hero sections
  full:   9999, // Circular avatars, badges, pills
} as const;

// ─────────────────────────────────────────────
// TOUCH TARGETS (WCAG / Mobile best practice)
// ─────────────────────────────────────────────

export const touchTarget = {
  min:      44,   // Absolute minimum tap target (px)
  button:   48,   // Standard button height
  iconBtn:  48,   // Icon-only buttons
  listItem: 56,   // List items, setting rows
  fab:      56,   // Floating Action Button
} as const;

// ─────────────────────────────────────────────
// ELEVATION (Shadows for light mode)
// ─────────────────────────────────────────────

export const elevation = {
  none:     'none',
  sm:       '0 1px 3px rgba(23, 35, 34, 0.06), 0 1px 2px rgba(23, 35, 34, 0.04)',
  md:       '0 4px 8px rgba(23, 35, 34, 0.08), 0 2px 4px rgba(23, 35, 34, 0.04)',
  lg:       '0 8px 24px rgba(23, 35, 34, 0.12), 0 4px 8px rgba(23, 35, 34, 0.06)',
  xl:       '0 16px 48px rgba(23, 35, 34, 0.16), 0 8px 16px rgba(23, 35, 34, 0.08)',
  bottomSheet: '0 -4px 24px rgba(23, 35, 34, 0.12)',
} as const;

export const elevationDark = {
  none:     'none',
  sm:       '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
  md:       '0 4px 8px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)',
  lg:       '0 8px 24px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)',
  xl:       '0 16px 48px rgba(0, 0, 0, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)',
  bottomSheet: '0 -4px 24px rgba(0, 0, 0, 0.5)',
} as const;

// ─────────────────────────────────────────────
// ANIMATION
// ─────────────────────────────────────────────

export const duration = {
  instant:  100,   // Micro-interactions (checkbox, toggle)
  fast:     200,   // Button press, small transitions
  normal:   300,   // Modal open, sheet slide
  slow:     500,   // Page transitions, onboarding
} as const;

export const easing = {
  default:    'cubic-bezier(0.2, 0, 0, 1)',     // Material 3 standard
  decelerate: 'cubic-bezier(0, 0, 0, 1)',       // Enter screen
  accelerate: 'cubic-bezier(0.3, 0, 1, 1)',     // Leave screen
  spring:     'cubic-bezier(0.34, 1.56, 0.64, 1)', // Playful bounce
} as const;

// ─────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────

export type FontSize = typeof fontSize;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Elevation = typeof elevation;

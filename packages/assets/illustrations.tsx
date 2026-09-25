/**
 * weTag Native Vector SVG Illustration Library (WS-14)
 * Provides clean, lightweight, resolution-independent illustrations for onboarding, empty states, and celebrations.
 */

import React from 'react';
import Svg, { Path, Circle, Rect, G, Defs, LinearGradient, Stop } from 'react-native-svg';

export interface IllustrationProps {
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Slide 1: Car & Empty Seats — "Make room for someone going your way."
 */
export const OnboardingSlideOne: React.FC<IllustrationProps> = ({
  width = 280,
  height = 200,
  primaryColor = '#123C3A',
  secondaryColor = '#18B88A',
}) => (
  <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
    <Defs>
      <LinearGradient id="carGlow" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor={secondaryColor} stopOpacity="0.3" />
        <Stop offset="100%" stopColor={secondaryColor} stopOpacity="0.0" />
      </LinearGradient>
    </Defs>
    {/* Background corridor trajectory */}
    <Path d="M20 160 C 90 120, 190 180, 260 140" stroke={secondaryColor} strokeWidth="3" strokeDasharray="6 6" />
    <Circle cx="40" cy="150" r="14" fill="#E8F7F2" stroke={secondaryColor} strokeWidth="2" />
    <Circle cx="240" cy="145" r="14" fill="#E8F7F2" stroke={secondaryColor} strokeWidth="2" />
    {/* Car Body */}
    <Rect x="70" y="70" width="140" height="70" rx="16" fill={primaryColor} />
    <Path d="M90 70 L110 35 L170 35 L190 70 Z" fill={primaryColor} />
    {/* Windows */}
    <Path d="M96 66 L114 40 L140 40 L140 66 Z" fill="#E8F7F2" opacity="0.9" />
    <Path d="M144 40 L166 40 L184 66 L144 66 Z" fill="#E8F7F2" opacity="0.9" />
    {/* Empty Seat Indicator (Glow Pulse) */}
    <Circle cx="160" cy="54" r="7" fill={secondaryColor} />
    {/* Wheels */}
    <Circle cx="105" cy="140" r="18" fill="#1F2937" />
    <Circle cx="105" cy="140" r="8" fill="#F3F4F6" />
    <Circle cx="175" cy="140" r="18" fill="#1F2937" />
    <Circle cx="175" cy="140" r="8" fill="#F3F4F6" />
  </Svg>
);

/**
 * Slide 2: Transparent Real Move-In Total — "See the real cost before you fall in love."
 */
export const OnboardingSlideTwo: React.FC<IllustrationProps> = ({
  width = 280,
  height = 200,
  primaryColor = '#123C3A',
  secondaryColor = '#8FA888',
}) => (
  <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
    {/* House Outline */}
    <Path d="M50 110 L110 55 L170 110 L170 165 L50 165 Z" fill="#F7FAF8" stroke={primaryColor} strokeWidth="3" />
    {/* Roof */}
    <Path d="M40 115 L110 50 L180 115" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
    {/* Door */}
    <Rect x="95" y="125" width="30" height="40" rx="4" fill={primaryColor} />
    {/* Itemized Total Receipt Card */}
    <Rect x="145" y="45" width="115" height="120" rx="12" fill="#FFFFFF" stroke={secondaryColor} strokeWidth="2" />
    <Rect x="160" y="65" width="85" height="6" rx="3" fill="#E5E7EB" />
    <Rect x="160" y="80" width="65" height="6" rx="3" fill="#E5E7EB" />
    <Rect x="160" y="95" width="75" height="6" rx="3" fill="#E5E7EB" />
    <Rect x="160" y="115" width="85" height="12" rx="4" fill="#E8F7F2" />
    <Circle cx="202" cy="121" r="3" fill="#18B88A" />
  </Svg>
);

/**
 * Slide 3: Unified Trust & Safety — "Move. Stay. Settle in."
 */
export const OnboardingSlideThree: React.FC<IllustrationProps> = ({
  width = 280,
  height = 200,
  primaryColor = '#123C3A',
  secondaryColor = '#18B88A',
}) => (
  <Svg width={width} height={height} viewBox="0 0 280 200" fill="none">
    {/* Large Shield */}
    <Path
      d="M140 30 C 185 30, 210 55, 210 100 C 210 145, 165 175, 140 185 C 115 175, 70 145, 70 100 C 70 55, 95 30, 140 30 Z"
      fill="#E8F7F2"
      stroke={secondaryColor}
      strokeWidth="4"
    />
    {/* 4-Digit High-Contrast PIN Badges */}
    <Rect x="100" y="90" width="18" height="24" rx="4" fill={primaryColor} />
    <Rect x="123" y="90" width="18" height="24" rx="4" fill={primaryColor} />
    <Rect x="146" y="90" width="18" height="24" rx="4" fill={primaryColor} />
    <Rect x="169" y="90" width="18" height="24" rx="4" fill={primaryColor} />
  </Svg>
);

/**
 * Empty State: No active rides on this corridor yet.
 */
export const EmptyRidesIllustration: React.FC<IllustrationProps> = ({
  width = 200,
  height = 140,
  primaryColor = '#9CA3AF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 200 140" fill="none">
    <Circle cx="100" cy="70" r="50" fill="#F3F4F6" />
    <Path d="M70 70 Q 100 40, 130 70 T 170 70" stroke={primaryColor} strokeWidth="2" strokeDasharray="4 4" />
    <Circle cx="70" cy="70" r="6" fill={primaryColor} />
    <Circle cx="130" cy="70" r="6" fill={primaryColor} />
  </Svg>
);

/**
 * Empty State: No matching properties in this area.
 */
export const EmptyListingsIllustration: React.FC<IllustrationProps> = ({
  width = 200,
  height = 140,
  primaryColor = '#9CA3AF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 200 140" fill="none">
    <Circle cx="100" cy="70" r="50" fill="#F3F4F6" />
    <Path d="M75 85 L100 60 L125 85 L125 105 L75 105 Z" fill="none" stroke={primaryColor} strokeWidth="2" />
    <Circle cx="100" cy="80" r="10" stroke={primaryColor} strokeWidth="2" />
    <Path d="M107 87 L116 96" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

/**
 * Empty State: Empty Wallet.
 */
export const EmptyWalletIllustration: React.FC<IllustrationProps> = ({
  width = 200,
  height = 140,
  primaryColor = '#9CA3AF',
}) => (
  <Svg width={width} height={height} viewBox="0 0 200 140" fill="none">
    <Rect x="50" y="45" width="100" height="60" rx="10" fill="#F3F4F6" stroke={primaryColor} strokeWidth="2" />
    <Circle cx="130" cy="75" r="6" fill={primaryColor} />
  </Svg>
);

# weTag (iTag) — Canonical Mobile Design System (DESIGN.md)

**Product**: weTag (iTag) Mobile Application  
**Market**: Ibadan, Oyo State, Nigeria  
**Design Philosophy**: **Civic Clarity · Generous Whitespace · Zero Dense Wordings · Offline-First Safety**  
**Baseline Viewport**: `390px × 844px` (Responsive scale across iOS & 720p/1080p Android)

---

## 1. Design Philosophy & Anti-Density Manifesto

### 1.1 The Rule of "Glanceable Action"
Commuters standing at Akobo General Gas junction at 7:15 AM or university students searching for hostels along UI Agbowo do not read long marketing paragraphs.
* **Every screen must be understood in 3 seconds**.
* **Zero dense wordings**: Replace multi-line explanations with numeric data tags, badge pills, and bold actionable verbs.
* **Negative space is a functional tool**: Generous whitespace separates cognitive zones, prevents mis-taps on crowded streets, and ensures high readability on budget 720p Android displays (Tecno, Infinix, itel).

### 1.2 Copy Modernization Matrix (Dense vs. Brilliant)

| Context | Dense / Verbose (Forbidden) | Brilliant / Lean weTag (Canonical) |
| :--- | :--- | :--- |
| **Home Greeting** | *"Good morning, Tolu. Welcome back to Ibadan’s trusted local-life network turning everyday commutes into shared journeys."* | **"Good morning, Tolu 👋"**<br>`Ibadan North · Route Ready` |
| **Morning Commute** | *"You have 2 matching rides going your way along the Akobo corridor to Dugbe this morning. Join neighbours driving your way."* | **"Akobo ➔ Dugbe"**<br>`7:15 AM · ₦800 · 2 matching rides` |
| **Seat Booking** | *"Initiate instant seat allocation and hold funds in escrow until physical trip completion."* | **"Confirm Seat · ₦450"**<br>`Includes ₦50 Oyo 615 Safety Fund` |
| **Housing Guarantee** | *"Every home displays the complete move-in cost upfront. No surprise gate fee, no sudden form charges, no unannounced agent markups."* | **"₦890,000 Total Move-In"**<br>`Rent ₦700k + Capped 10% Fees + Caution` |
| **Utility Split** | *"Execute equal 3-way expense split for shared generator diesel and IBEDC Band A recharge."* | **"Each flatmate owes ₦6,133"**<br>`IBEDC & Diesel · Due in 3 days` |
| **Emergency** | Screaming red alarmist banners: *"CRITICAL EMERGENCY SOS 615 POLICE CALL NOW"* | Neutral floating shield: **"Oyo 615 Response"**<br>`One-tap dispatch assistance` |

---

## 2. Spatial Grid, Whitespace & Ergonomic Geometry

```
┌───────────────────────────────────────────────┐  ▲
│ Top App Bar (h-14 / 56px)                     │  │ Safe Area Top
├───────────────────────────────────────────────┤  ▼
│                                               │
│  Horizontal Margin: 20px (px-5)               │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Primary Action Card                     │  │
│  │ - Padding: 18px (p-4.5)                 │  │
│  │ - Rounded: 18px (rounded-2xl)           │  │
│  │ - Border: 1px solid #E2EBE6             │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  Vertical Card Gap: 16px–20px (space-y-4)     │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │ Secondary Content Card                  │  │
│  └─────────────────────────────────────────┘  │
│                                               │
├───────────────────────────────────────────────┤  ▲
│ Bottom Navigation Bar (h-16 / 64px)           │  │ Safe Area Bottom
└───────────────────────────────────────────────┘  ▼
```

### 2.1 Spatial Scale (8pt Grid)
* **Screen Inset**: Standard `20px` (`px-5`) on mobile; expands to `32px` on tablet/desktop.
* **Component Padding**:
  * Dense Badges/Pills: `6px 12px` (`py-1.5 px-3`)
  * Standard Cards: `16px–18px` (`p-4` to `p-4.5`)
  * Modal Sheets: `20px–24px` (`p-5` to `p-6`)
* **Vertical Rhythm**:
  * Micro Gap: `4px` (`gap-1`)
  * Item Gap: `8px` (`gap-2`)
  * Sub-block Gap: `12px` (`gap-3`)
  * Section Gap: `20px` (`mb-5`)
  * Screen Block Gap: `28px` (`mb-7`)
* **Corner Radii**:
  * Badges & Status Pills: `9999px` (Full Pill)
  * Action Buttons & Inputs: `14px` (`rounded-xl`)
  * Content Cards: `18px` (`rounded-2xl`)
  * Modal Bottom Sheets: Top `24px` (`rounded-t-[24px]`)
* **Touch Targets (Nigerian Street Ergonomics)**:
  * Primary Action CTA: `54px` min height (`h-[54px]`)
  * Secondary / Filter Buttons: `44px` min height (`h-11`)
  * List Items: `64px`–`72px` min height

---

## 3. Color Token System & Semantic Boundaries

| Token Name | Hex Code | Visual Role & Semantic Rule |
| :--- | :--- | :--- |
| **`surface.porcelain`** | `#F7FAF8` | **Base canvas background**. Soft, warm off-white that reduces glare under Nigerian sunlight. |
| **`surface.card`** | `#FFFFFF` | **Elevated content container**. Always paired with hairline border `#E6ECE8`. |
| **`primary.forest`** | `#123C3A` | **Brand anchor & primary text**. Used for main headers, dark hero cards, and primary buttons. |
| **`primary.deep`** | `#0C2927` | **Night / deep contrast**. Used for high-emphasis navigation chrome and modal scrims. |
| **`accent.emerald`** | `#18B88A` | **Positive action & trust**. Verification badges, active indicators, confirmed states. |
| **`accent.move`** | `#2563EB` | **Transit Blue**. Exclusively quarantined to mobility routes, vehicle icons, and commute detours. |
| **`accent.stay`** | `#D97706` | **Housing Amber / Warm Clay**. Exclusively quarantined to verified property listings, utility tags, rent totals. |
| **`safety.coral`** | `#EF4444` | **Emergency Coral**. Strictly reserved for live SOS triggers and active 615 emergency calls. |
| **`text.primary`** | `#161D1B` | High-contrast body and title typography (minimum 7:1 contrast on white). |
| **`text.muted`** | `#717978` | Glanceable secondary metadata, timestamps, and distance tags. |
| **`border.subtle`** | `#E2EBE6` | 1px hairline division separating card layers cleanly without visual clutter. |

---

## 4. Core Component Architecture

### 4.1 `RoutineCard` (Contextual Daily Launchpad)
Replaces 5 scattered buttons with a single glanceable morning or evening commute card:
* **Visual Form**: Clean `#FFFFFF` card with soft shadow and `18px` rounded corners.
* **Top Row**: Clean status badge (`"7:15 AM Target"`) + route label (`"Akobo ➔ Dugbe"`).
* **Middle Visual**: Two-node transit line showing origin (`General Gas`) and destination (`Cocoa House Hub`) with estimated transit time (`28 mins`).
* **Bottom Row**: Driver match avatar stack (`KA`, `SO`), fair fuel contribution (`₦800`), and a prominent 1-tap button: `"Book Seat ➔"`.

### 4.2 `PropertyCard` (Radical Price Clarity)
Eliminates deceptive listing practices:
* **Visual Form**: High-aspect photo card (`16:9` ratio) with rounded top corners.
* **Trust Badges (Top Overlay)**: Floating glass pills: `Verified Landlord` · `Zero Hidden Fees`.
* **Primary Headline**: Large bold price: **`₦890,000`** with label `Real Move-In Total (Upfront)`.
* **Itemized Subtext**: `Base Rent ₦700k/yr · 10% Agency · 10% Legal · Refundable Caution ₦50k`.
* **Utility Reality Pills**: 4 simple iconography tags:
  * `💧 24/7 Borehole`
  * `⚡ Dedicated Prepaid Meter`
  * `🛡️ Gated Security`
  * `🚗 Allocated Parking`

### 4.3 `ActiveTripSheet` (Offline 4-Digit Safety PIN)
Designed for low-connectivity corridors (Iwo Road, Moniya, express bypasses):
* **Hero Display**: Prominent dark container (`#123C3A`) with huge, monospaced **4-Digit Drop-Off PIN** (`4 8 2 1`).
* **Offline Seal**: Green dot with microcopy: `"Active trip cached offline · Valid without network"`.
* **Driver Tile**: Driver portrait avatar, verified badge, vehicle plate (`Toyota Corolla · OYO-742-BDJ`), and one-tap voice call.
* **Safety Access**: Quiet, accessible button: `"Oyo 615 Emergency Response"`.

### 4.4 `LivingLedgerCard` (Shared Co-Living Splitter)
Designed for co-tenants in shared flats:
* **Top Summary**: Total month-to-date household expenses (`₦36,800`) and remaining IBEDC prepaid units (`142 kWh · ~9 days left`).
* **Expense Row**: Category icon (`⚡ IBEDC`, `⛽ Generator Diesel`, `🛡️ Estate Dues`), total bill, and split allocation tag (`"Your share: ₦6,133"`).
* **Action**: Single 1-tap button: `"Settle via Wallet"`.

---

## 5. Screen Layout Specifications (Lean & Breathing)

### Screen 1: Home Launchpad (`/`)
* **Above the Fold**:
  * Minimalist header: weTag logo + City selector (`Ibadan`) + Profile avatar.
  * Personal greeting: `Good morning, Tolu 👋` + `Route Ready` badge.
  * The **Routine Card**: Akobo ➔ Dugbe morning commute shortcut with instant booking.
* **Middle Section (Whitespace Divider `24px`)**:
  * Dual Action Tiles (Side-by-side):
    * **MOVE**: `Share a ride · from ₦300` (Transit Blue accent)
    * **STAY**: `Verified homes · No hidden fees` (Warm Amber accent)
* **Bottom Section**:
  * Single high-relevance card: either an upcoming confirmed return ride OR a nearby verified home on the user's route.

### Screen 2: MOVE Hub (`/move`)
* **Top Bar**: Search bar with destination autocomplete (`"Where are you going?"`) + Emergency 615 floating pill.
* **Section 1**: Active recurring routines (`Morning Commute: Akobo ➔ Dugbe`).
* **Section 2 (Whitespace Divider `20px`)**: Curated corridor matches for today.
  * Each card shows driver photo, vehicle plate, departure time (`7:20 AM`), detour time (`+4 min detour`), price (`₦800/seat`), and `"Book Seat"` button.

### Screen 3: STAY Hub (`/stay`)
* **Top Bar**: District filter tags (`Bodija`, `UI Agbowo`, `Akobo`, `Samonda`, `NYSC Settle-In`).
* **Section 1**: Radical transparency banner: `"All listings show guaranteed total move-in prices."`
* **Section 2**: Feed of verified properties with upfront `₦890k Move-In Total` and utility reality badges.

---

## 6. Implementation Guidelines for React Native / Expo

1. **Token Hierarchy**: Import all tokens directly from `apps/mobile/src/theme/colors.ts` and `typography.ts`. No hardcoded hex values in component files.
2. **Text Ellipsis & Truncation**: Every text field must declare `numberOfLines` to prevent layout breaking on 720p Android displays.
3. **Safe Areas**: Use `react-native-safe-area-context` on all root views with explicit `edges={['top', 'bottom']}`.
4. **Performance**: Zero inline functions in FlatList `renderItem`. Pre-computed layout heights to prevent list jank.

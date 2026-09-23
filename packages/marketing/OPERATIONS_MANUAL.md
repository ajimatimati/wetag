# weTag (iTag) — Administrative Operations Manual (Day-to-Day Execution)

**Market**: Ibadan, Oyo State, Nigeria  
**Coverage**: Commute Corridors (Akobo, Bodija, Dugbe, Secretariat, UCH, UI) & Verified Rental Enclaves (Bodija, Agbowo, Kongi, Samonda)  
**Operating Standard**: Zero tolerance for unverified profiles, rapid ground response, 100% cashless escrow settlement.

---

## 1. Internal Team Structure & Operating Roles

| Role | Key Responsibility | Tools Used |
| :--- | :--- | :--- |
| **Corridor Dispatch & Safety Controller (CDSC)** | Monitors real-time carpool corridors, tracks 4-digit PIN redemptions, manages route deviations, liaises with Oyo State 615 Emergency Services. | weTag Admin Dashboard, Oyo 615 Hotline, WhatsApp Business Operations line. |
| **KYC & Trust Compliance Officer (KTCO)** | Verifies National Identification Numbers (NIN), driver’s licenses, vehicle roadworthiness, and student/civil service employment credentials. | NIMC Verification API, FRSC License Portal, Admin Verification Queue. |
| **Field Verification Officer (FVO - Ground Scouts)** | Conducts physical inspections of housing listings in Bodija and Agbowo; tests borehole water pumps, checks dedicated prepaid meters, and captures 360° verified photos. | weTag Mobile Inspector App, Test Plug/Multimeter, Geotagged Camera. |
| **Escrow Settlement & Ledger Arbitrator (ESLA)** | Oversees automated ride payouts, audits shared apartment living ledgers (IBEDC & diesel splits), resolves roommate payment disputes. | Paystack / Monnify Escrow Gateway, Household Ledger Admin Tool. |
| **Community & Partner Liaison (CPL)** | Manages relationships with Estate CDA Chairmen, hostel lodge caretakers, and Bovas fuel station franchise managers. | WhatsApp Broadcast Engine, CDA Meeting Roster, Voucher Distribution Queue. |

---

## 2. Daily Hour-by-Hour Operational Lifecycle

```
06:00 AM ── [Corridor Wakeup & Live Tracking Standby]
06:30 AM ── [Morning Commute Peak: Akobo ➔ Secretariat / Dugbe]
08:30 AM ── [Morning Trip Audit & PIN Exception Clearing]
09:00 AM ── [KYC Verification Queue: Drivers & Caretakers]
11:00 AM ── [Physical Ground Inspections: Bodija & Agbowo Properties]
03:00 PM ── [Tenant Handover Bounty Settlements (₦5,000)]
04:30 PM ── [Evening Commute Operations: Dugbe ➔ Akobo]
07:30 PM ── [Escrow Payout Releases to Drivers]
08:30 PM ── [Shared Household Utility Ledger Audits & Reconciliation]
09:30 PM ── [Daily Executive Metrics & Incident Sign-Off]
```

---

### Phase 1: 06:00 AM – 08:30 AM | Morning Commute Peak (MOVE)

#### Primary Owner: Corridor Dispatch & Safety Controller (CDSC)
1. **06:00 AM — Routine Corridor Verification**:
   - Dispatcher opens the live admin corridor map focusing on the primary morning arteries:
     - **Corridor 1**: Akobo (General Gas Roundabout) ➔ Agodi Secretariat
     - **Corridor 2**: Akobo ➔ Dugbe (Cocoa House Hub)
     - **Corridor 3**: Bodija / Kongi ➔ UCH / UI Agbowo
   - Confirms all scheduled commuter drivers for the 6:45 AM – 7:45 AM slots are online.
2. **07:00 AM – 08:15 AM — Boarding & In-Transit Live Monitoring**:
   - Commuters board driver vehicles. Commuter enters the driver's vehicle and shows the **4-Digit Pickup PIN**.
   - If a driver has not started navigation within 7 minutes of the scheduled departure time:
     - Dispatcher receives an automated Slack/WhatsApp alert: `DELAY_TRIGGER: Trip #MK-412 (Akobo ➔ Secretariat) driver delayed`.
     - Dispatcher calls the driver via the masked weTag voice relay to confirm status.
3. **Safety & Emergency Protocol**:
   - If a vehicle deviates by more than 2.0 km from the geofenced Ibadan transit corridor:
     - The app flags `CORRIDOR_ANOMALY`.
     - Dispatcher initiates contact with both driver and passenger.
     - If unanswered within 90 seconds, dispatcher triggers the **Oyo State 615 Emergency Hotline protocol** with live GPS coordinates.

---

### Phase 2: 08:30 AM – 10:30 AM | KYC Verification & Driver Onboarding

#### Primary Owner: KYC & Trust Compliance Officer (KTCO)
1. **Driver Approval Pipeline**:
   - Reviews driver submissions from `wetag.ng/onboard`:
     - **NIN Verification**: Validates 11-digit NIN against government identity database (verifies facial match and date of birth).
     - **Driver’s License & Plate**: Cross-references plate with Oyo State vehicle licensing records.
     - **Employer / Civil Service Proof**: Confirms ministry ID card (for Secretariat carpools) or resident proof (for Akobo gated estates).
2. **Bovas Fuel Voucher Dispatch**:
   - Once a newly registered driver completes their 5th verified routine trip, the system queues a **₦10,000 Bovas Fuel Voucher**.
   - Officer reviews completion logs and releases the digital voucher code via SMS/WhatsApp within 30 minutes.

---

### Phase 3: 10:30 AM – 03:30 PM | Physical Ground Scouting & Property Verification (STAY)

#### Primary Owner: Field Verification Officers (FVOs)
1. **Daily Inspection Schedule (5–8 Properties per Scout)**:
   - Scouts on electric bikes or okadas travel to scheduled compounds in Old Bodija, Kongi, Agbowo, and Samonda.
2. **Standard 4-Point Utility Reality Inspection**:
   - **Water Check**: Turn on the borehole tap; test water pressure and confirm dedicated overhead storage tanks (minimum 1,500L).
   - **Electricity Check**: Inspect the dedicated prepaid meter. Note the IBEDC meter number, tariff band (Band A vs. Band B), and verify zero outstanding legacy debt.
   - **Generator Backup**: Inspect soundproof generator capacity and operating hours (standard: 6:00 PM – 6:00 AM).
   - **Security Audit**: Inspect estate perimeter fence, gate lock system, and security guard post.
3. **Compound Photography & Listing Upload**:
   - Scout takes 8 standard photos (Compound Gate, Living Room, Bedroom, Kitchen, Bathroom, Meter, Borehole pump, Street access).
   - Uploads via the Mobile Inspector tool directly to the staging queue with the **Real Move-In Total** calculation (Rent + 10% capped agency + 10% legal + caution).
   - Signs off the listing with **"weTag Civic Inspected"** digital seal.

---

### Phase 4: 03:30 PM – 05:00 PM | Tenant Handover Bounty Settlements

#### Primary Owner: Escrow Settlement & Ledger Arbitrator (ESLA)
1. **Processing Outgoing Tenant Bounties**:
   - Outgoing students or NYSC corpers who submitted their flats for the ₦5,000 Handover Bounty are verified once the Field Officer confirms the caretaker's agreement.
   - Arbitrator triggers instant payout of **₦5,000** to the outgoing tenant's Universal Wallet, OPay, or commercial bank account.
2. **Listing Activation**:
   - Approved properties are pushed live to the weTag STAY search feed.
   - Instant WhatsApp notifications are broadcast to waitlisted users seeking flats in that specific neighborhood (e.g. *"2-Bed in Old Bodija just verified: ₦890k upfront total"*).

---

### Phase 5: 05:00 PM – 07:30 PM | Evening Return Commute Operations (MOVE)

#### Primary Owner: Corridor Dispatch & Safety Controller (CDSC)
1. **Reverse Corridor Coordination**:
   - Monitors return rush hour from Agodi Secretariat and Dugbe Cocoa House Hub heading back to Akobo, Bodija, and Oluyole (4:30 PM – 6:30 PM).
2. **Passenger Safe Drop-off & 4-Digit PIN Validation**:
   - As passengers arrive at their drop-off destinations, they communicate the **4-digit Drop-Off PIN** to the driver.
   - Driver keys the PIN into the app, which instantly confirms trip completion and moves funds from escrow into the driver's pending payout balance.

---

### Phase 6: 07:30 PM – 09:30 PM | Financial Settlements & Living Ledger Audits

#### Primary Owner: Escrow Settlement & Ledger Arbitrator (ESLA)
1. **Daily Driver Payouts**:
   - Audits all completed trips for the day.
   - Releases accumulated fuel offset funds (₦1,200 – ₦2,400 per driver) directly to their Universal Wallet or connected bank account with 0% delay.
2. **Shared Living Ledger Audits (STAY Flats)**:
   - Reviews shared bills logged by co-tenants (e.g., August IBEDC recharge of ₦18,400 or diesel purchase of ₦15,000).
   - Validates utility receipts uploaded by flatmates.
   - Resolves split calculation discrepancies (e.g., equal 3-way split vs. room-weighted split) within 2 hours to avoid flatmate friction.
3. **Daily Executive Metrics Sign-Off**:
   - Officer files the daily performance summary:
     - Completed Trips & Seat Occupancy Rate (target > 88%)
     - Active Verified Commuter Drivers on Akobo corridor
     - Number of New Inspected Homes published
     - Zero unresolved safety alerts.

# weTag 24/7 Safety Operations & Incident Response Handbook

*Standard Operating Procedures for weTag Safety Operators in Ibadan*  
*Emergency Partner: Oyo State 615 Citizens' Emergency Service*

---

## 1. Safety Desk Mission
The weTag Safety Desk monitors active corridor journeys and property viewings across Ibadan. The primary directive is **rapid de-escalation, immediate evidence preservation, and direct emergency coordination**.

---

## 2. Alert Escalation Protocols

### Level 1: Route Deviation (>2.5 km off corridor)
1. **Trigger**: Telemetry engine emits `ROUTE_ANOMALY` when vehicle path diverges from corridor vector.
2. **Action**:
   - Automated push prompt sent to rider: *"Everything okay on your trip?"*
   - Operator monitors live GPS trail on the [Admin Safety Console](file:///c:/Users/USER/.gemini/antigravity/scratch/ride_share_platform/apps/admin/src/app/safety/page.tsx).
   - If rider marks "Need Assistance" or fails to respond within 3 minutes, escalate to Level 2.

### Level 2: Unresponsive Check-In / Prolonged Stoppage (>10 min)
1. **Trigger**: Vehicle is stationary in a non-traffic zone for >10 minutes without rider communication.
2. **Action**:
   - Operator places direct call to driver: *"Hello, this is weTag Safety. We noticed your vehicle is stationary near [Landmark]. Is everyone safe?"*
   - If driver fails to answer, place direct call to rider.
   - If both fail to answer, alert the rider's designated **Trusted Contacts** via automated Termii SMS broadcast.

### Level 3: Critical Emergency / SOS Trigger
1. **Trigger**: Rider or driver taps the **Emergency SOS** button on the Safety Pill.
2. **Immediate Action**:
   - **Step 1 (Hotline Dispatch)**: Operator places direct emergency patch to **Oyo State 615 Citizens' Emergency Centre** with:
     - Caller Name & verified phone number.
     - Live vehicle plate number (`make`, `model`, `color`, `plateNumber`).
     - Current GPS coordinates & nearest landmark.
     - Live Tracking Map URL: `https://live.wetag.ng/safety/track/[tripId]`
   - **Step 2 (SMS Broadcast)**: System instantly sends SMS to all registered trusted contacts.
   - **Step 3 (Evidence Preservation)**: The entire trip GPS log, chat history, and vehicle profile are locked into immutable legal cold storage.

---

## 3. Incident Logging & Regulatory Reporting
- Every Level 2 and Level 3 event generates an **Incident Case Record** in the Admin Console.
- In accordance with the Nigeria Data Protection Act (NDPA) and Oyo State transport oversight, incident logs are retained for **10 years** for law enforcement auditing.

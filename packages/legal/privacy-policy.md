# weTag Privacy Policy & Data Protection Declaration

*Compliance: Nigeria Data Protection Act (NDPA) 2023 / NDPC Guidelines*  
*Effective Date: August 2026*

---

## 1. Data Controller Statement
weTag Mobility & Living Limited ("weTag") is registered as a Data Controller with the Nigeria Data Protection Commission (NDPC). We are committed to processing your personal data lawfully, fairly, and transparently in strict compliance with the Nigeria Data Protection Act 2023.

---

## 2. Personal Data We Collect

### A. Information You Provide
- **Identity & Verification**: Name, phone number, email address, profile photo, date of birth, National Identification Number (NIN), and Driver's License details (processed via Smile ID encrypted APIs).
- **Vehicle Data**: Make, model, year, color, and plate number.
- **Housing Preferences**: Sleep schedule, cleanliness, smoking, and pet preferences for flatmate matching.
- **Financial Data**: Bank Name, Account Number (NUBAN), and payment authorization tokens (tokenized via Paystack).

### B. Information Automatically Collected
- **Real-Time GPS Location**: High-frequency GPS telemetry collected *strictly* during active MOVE journeys (every 10 seconds) for route deviation tracking and emergency SOS dispatch. Location tracking ceases when the trip is marked completed.
- **Device & Telemetry**: IP address, device model, operating system, and crash logs.

---

## 3. Lawful Basis & Purposes of Processing
1. **Performance of Contract**: Matching riders with compatible drivers, reserving seats, booking property viewings, and recording shared household expenses.
2. **Vital Interests & Public Safety**: Sharing live GPS telemetry with Oyo State 615 Citizens' Emergency operators and designated trusted contacts during SOS triggers.
3. **Legal & Regulatory Obligations**: Retaining financial transaction ledgers for 7 years as required by Nigerian tax and financial auditing standards.
4. **Legitimate Interests**: Detecting duplicate scam property listings using 64-bit perceptual image hashing (`pHash`).

---

## 4. Data Sharing & Third-Party Processors
We do not sell, rent, or trade your personal data. Data is shared strictly with:
- **KYC & Biometrics**: Smile ID / Dojah / Prembly (encrypted identity verification).
- **Payment Processing**: Paystack Payments Limited (CBN-licensed).
- **SMS & Communications**: Termii (telecommunications carrier proxy; real phone numbers are masked).
- **Emergency Services**: Oyo State 615 Citizens' Emergency Centre and the Federal Emergency Management Agency (112) upon user SOS initiation.

---

## 5. Data Subject Rights (NDPA 2023)
Under the NDPA 2023, you hold the following statutory rights:
1. **Right of Access**: You may request a machine-readable export of all personal data held in your profile.
2. **Right to Rectification**: You can update inaccurate profile information via `PUT /api/account/profile`.
3. **Right to Erasure ("Right to be Forgotten")**: You may request account deletion via `POST /api/account/delete`. Your PII (name, email, photo) is immediately anonymized, while transaction audit logs are retained in cold storage for statutory retention periods.
4. **Right to Restrict or Object**: You may toggle optional consents (e.g. promotional notifications) at any time.

---

## 6. Data Retention Schedule
- **Live GPS Telemetry**: 90 days, after which coordinates are aggregated into anonymous traffic corridor statistics.
- **Chat Messages**: 2 years following trip or tenancy completion.
- **KYC Verification Proofs**: Encrypted storage for the duration of the account relationship + 6 years.
- **Financial & Tax Records**: 7 years per statutory requirements.

---

## 7. Contacting the Data Protection Officer (DPO)
For inquiries regarding your personal data, contact:  
**Data Protection Officer**  
weTag Mobility & Living Limited  
Email: `dpo@wetag.ng`  
Ibadan, Oyo State, Nigeria

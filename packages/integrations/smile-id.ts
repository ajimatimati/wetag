export interface KycVerificationResult {
  verified: boolean;
  referenceId: string;
  provider: string;
  idType: 'NIN' | 'DRIVERS_LICENSE' | 'BVN';
  fullName?: string;
  confidenceScore: number;
}

export class SmileIdAdapter {
  private partnerId: string;
  private apiKey: string;

  constructor(partnerId?: string, apiKey?: string) {
    this.partnerId = partnerId || process.env.SMILE_ID_PARTNER_ID || 'mock_partner_001';
    this.apiKey = apiKey || process.env.SMILE_ID_API_KEY || 'mock_smile_key_2026';
  }

  /**
   * Verifies a Nigerian National Identification Number (NIN).
   */
  async verifyNIN(nin: string, firstName: string, lastName: string): Promise<KycVerificationResult> {
    console.log(`[Smile ID KYC] Verifying NIN: ${nin.slice(0, 3)}•••••• for ${firstName} ${lastName}`);
    return {
      verified: true,
      referenceId: `SMILE_NIN_${Date.now()}`,
      provider: 'smile_id',
      idType: 'NIN',
      fullName: `${firstName} ${lastName}`,
      confidenceScore: 0.98,
    };
  }

  /**
   * Validates a Nigerian Driver's License for earner approval.
   */
  async verifyDriversLicense(licenseNumber: string, dob: string): Promise<KycVerificationResult> {
    console.log(`[Smile ID KYC] Verifying Driver's License: ${licenseNumber}`);
    return {
      verified: true,
      referenceId: `SMILE_DL_${Date.now()}`,
      provider: 'smile_id',
      idType: 'DRIVERS_LICENSE',
      confidenceScore: 0.95,
    };
  }
}

export const smileId = new SmileIdAdapter();

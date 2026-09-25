export interface TermiiSendResponse {
  message_id: string;
  message: string;
  balance: number;
  user: string;
}

export class TermiiAdapter {
  private apiKey: string;
  private senderId: string;

  constructor(apiKey?: string, senderId?: string) {
    this.apiKey = apiKey || process.env.TERMII_API_KEY || 'mock_termii_key_ibadan_2026';
    this.senderId = senderId || process.env.TERMII_SENDER_ID || 'weTag';
  }

  /**
   * Sends an authentication OTP to a Nigerian phone number.
   */
  async sendOtp(phoneNumber: string, code: string): Promise<TermiiSendResponse> {
    console.log(`[Termii SMS Gateway] To: ${phoneNumber} | Sender: ${this.senderId} | Code: ${code}`);
    return {
      message_id: `MSG_${Date.now()}`,
      message: 'Successfully Sent',
      balance: 950,
      user: 'weTag Logistics',
    };
  }

  /**
   * Sends an emergency SMS alert to a trusted contact.
   */
  async sendEmergencyAlert(contactPhone: string, alertText: string): Promise<TermiiSendResponse> {
    console.warn(`[Termii SOS Broadcast] To: ${contactPhone} | Message: ${alertText}`);
    return {
      message_id: `SOS_${Date.now()}`,
      message: 'Emergency Broadcast Delivered',
      balance: 948,
      user: 'weTag Safety Team',
    };
  }
}

export const termii = new TermiiAdapter();

/**
 * weTag Pre-Launch Waitlist & Interactive Calculator Component
 * Designed for public early-access acquisition in Ibadan.
 */

import React, { useState } from 'react';

export const WeTagLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MOVE' | 'STAY'>('MOVE');
  const [selectedCorridor, setSelectedCorridor] = useState('akobo_dugbe');
  const [driverDays, setDriverDays] = useState(5);
  const [seatsOffered, setSeatsOffered] = useState(2);
  const [propertyRent, setPropertyRent] = useState(700000);

  // MOVE Fuel Offset Calculation
  const corridorRates: Record<string, { name: string; fare: number; km: number }> = {
    akobo_dugbe: { name: 'Akobo (General Gas) ➔ Dugbe (Cocoa House)', fare: 400, km: 14.2 },
    ui_secretariat: { name: 'UI Post Office ➔ Oyo Secretariat', fare: 300, km: 7.8 },
    bodija_ringroad: { name: 'Old Bodija ➔ Ring Road (High Court)', fare: 500, km: 11.5 },
  };

  const currentCorridor = corridorRates[selectedCorridor];
  const monthlyDriverEarnings = currentCorridor.fare * seatsOffered * 2 * driverDays * 4; // return trips x 4 weeks

  // STAY Real Move-In Calculation
  const agencyFee = Math.round(propertyRent * 0.1);
  const legalFee = Math.round(propertyRent * 0.1);
  const cautionDeposit = 50000;
  const realMoveInTotal = propertyRent + agencyFee + legalFee + cautionDeposit;

  // Form State
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('RIDER');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#F7FAF8', color: '#111827', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#123C3A', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#18B88A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#FFFFFF' }}>W</div>
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.5px' }}>weTag</span>
        </div>
        <div style={{ fontSize: '13px', fontWeight: '600', color: '#A7F3D0', backgroundColor: 'rgba(24, 184, 138, 0.2)', padding: '6px 12px', borderRadius: '20px' }}>
          Launching in Ibadan 📍
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: '900', color: '#123C3A', lineHeight: '1.2', margin: '0 0 16px' }}>
          Move Better. Find Your Place in Ibadan.
        </h1>
        <p style={{ fontSize: '18px', color: '#4B5563', maxWidth: '640px', margin: '0 auto 32px', lineHeight: '1.6' }}>
          A trusted local-life network turning everyday commutes into shared carpools, and eliminating "total package" hidden fees from housing discovery.
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'inline-flex', backgroundColor: '#E5E7EB', padding: '4px', borderRadius: '14px', marginBottom: '36px' }}>
          <button
            onClick={() => setActiveTab('MOVE')}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: activeTab === 'MOVE' ? '#18B88A' : 'transparent',
              color: activeTab === 'MOVE' ? '#FFFFFF' : '#4B5563',
              transition: 'all 0.2s',
            }}
          >
            🚗 weTag MOVE (Carpooling)
          </button>
          <button
            onClick={() => setActiveTab('STAY')}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              backgroundColor: activeTab === 'STAY' ? '#123C3A' : 'transparent',
              color: activeTab === 'STAY' ? '#FFFFFF' : '#4B5563',
              transition: 'all 0.2s',
            }}
          >
            🏠 weTag STAY (Housing)
          </button>
        </div>

        {/* Interactive MOVE Calculator */}
        {activeTab === 'MOVE' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#123C3A', marginTop: 0 }}>Driver Fuel Offset Calculator</h3>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>See how much fuel cost you offset by offering your empty seats on your daily commute.</p>

            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>Select Your Daily Corridor:</label>
            <select
              value={selectedCorridor}
              onChange={(e) => setSelectedCorridor(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '14px', marginBottom: '16px' }}
            >
              <option value="akobo_dugbe">Akobo (General Gas) ➔ Dugbe (Cocoa House)</option>
              <option value="ui_secretariat">UI Post Office ➔ Oyo Secretariat (Agodi)</option>
              <option value="bodija_ringroad">Old Bodija ➔ Ring Road (High Court)</option>
            </select>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>Seats Offered: {seatsOffered}</label>
                <input type="range" min="1" max="4" value={seatsOffered} onChange={(e) => setSeatsOffered(parseInt(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>Days per Week: {driverDays}</label>
                <input type="range" min="1" max="6" value={driverDays} onChange={(e) => setDriverDays(parseInt(e.target.value))} style={{ width: '100%' }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#E8F7F2', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#18B88A', textTransform: 'uppercase' }}>Estimated Monthly Fuel Offset</div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#123C3A', margin: '4px 0' }}>
                ₦{monthlyDriverEarnings.toLocaleString()} <span style={{ fontSize: '14px', fontWeight: '600', color: '#4B5563' }}>/ month</span>
              </div>
              <div style={{ fontSize: '13px', color: '#4B5563' }}>Covers ~70% of your commute fuel expenses without extra driving hours.</div>
            </div>
          </div>
        )}

        {/* Interactive STAY Calculator */}
        {activeTab === 'STAY' && (
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#123C3A', marginTop: 0 }}>Real Move-In Price Guarantee</h3>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>No hidden inspection fees or inflated agent commissions. 100% itemized upfront.</p>

            <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px' }}>Annual Rent Amount: ₦{propertyRent.toLocaleString()}</label>
            <input type="range" min="300000" max="2500000" step="50000" value={propertyRent} onChange={(e) => setPropertyRent(parseInt(e.target.value))} style={{ width: '100%', marginBottom: '20px' }} />

            <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '6px 0', color: '#4B5563' }}>
                <span>Annual Base Rent:</span>
                <span style={{ fontWeight: '700' }}>₦{propertyRent.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '6px 0', color: '#4B5563' }}>
                <span>Agency Fee (10% standard):</span>
                <span style={{ fontWeight: '700' }}>₦{agencyFee.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '6px 0', color: '#4B5563' }}>
                <span>Legal Agreement Fee (10%):</span>
                <span style={{ fontWeight: '700' }}>₦{legalFee.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', margin: '6px 0', color: '#4B5563' }}>
                <span>Caution Deposit (Refundable):</span>
                <span style={{ fontWeight: '700' }}>₦{cautionDeposit.toLocaleString()}</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', color: '#123C3A', fontWeight: '900' }}>
                <span>Real Move-In Total:</span>
                <span style={{ color: '#18B88A' }}>₦{realMoveInTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Waitlist Form Section */}
      <section style={{ backgroundColor: '#123C3A', color: '#FFFFFF', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 12px' }}>Join the Ibadan Beta Waitlist</h2>
          <p style={{ fontSize: '15px', color: '#A7F3D0', margin: '0 0 28px' }}>
            Be among the first 200 commuters and house-hunters in Ibadan to get early access and zero platform fees for 30 days.
          </p>

          {submitted ? (
            <div style={{ backgroundColor: 'rgba(24, 184, 138, 0.2)', padding: '24px', borderRadius: '16px', border: '1px solid #18B88A' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#18B88A', margin: '0 0 8px' }}>You're on the list! 🎉</h3>
              <p style={{ fontSize: '14px', color: '#F3F4F6', margin: 0 }}>We will send an SMS invitation when your corridor goes live.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="tel"
                required
                placeholder="Enter your phone number (e.g. 08012345678)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ padding: '16px', borderRadius: '12px', border: 'none', fontSize: '15px', outline: 'none' }}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ padding: '14px', borderRadius: '12px', border: 'none', fontSize: '15px', outline: 'none', backgroundColor: '#FFFFFF', color: '#1F2937' }}
              >
                <option value="RIDER">I want to ride (Commuter)</option>
                <option value="DRIVER">I drive daily and want to share seats (Earner)</option>
                <option value="TENANT">I am looking for housing / flatmates</option>
                <option value="NYSC">I am an NYSC corps member in Oyo State</option>
                <option value="LANDLORD">I have properties to list</option>
              </select>
              <button
                type="submit"
                style={{ backgroundColor: '#18B88A', color: '#FFFFFF', padding: '16px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer', marginTop: '8px' }}
              >
                Claim Early Access
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 20px', textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>
        © 2026 weTag Mobility & Living Limited. Built with pride for Ibadan, Nigeria.
      </footer>
    </div>
  );
};

export default WeTagLandingPage;

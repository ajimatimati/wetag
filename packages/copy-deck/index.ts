/**
 * weTag Master UI Copy Deck & Help Center FAQ (WS-14)
 * Ibadan-First Voice: Warm, Clear, Local, Calm.
 */

export const COPY_DECK = {
  brand: {
    name: 'weTag',
    tagline: 'Move better. Find your place in Ibadan.',
    vision: 'A trusted local-life network connecting how you travel with where you live.',
  },

  onboarding: {
    slide1: {
      title: 'Make room for someone going your way',
      subtitle: 'Share your everyday commute across Ibadan, offset fuel costs, and ride with verified neighbors.',
      cta: 'Continue',
    },
    slide2: {
      title: 'See the real cost before you fall in love',
      subtitle: 'No hidden agency shocks. Transparent Real Move-In Totals itemized down to the last kobo.',
      cta: 'Continue',
    },
    slide3: {
      title: 'Move. Stay. Settle in.',
      subtitle: 'One verified identity for safe commutes, vetted flatmates, and shared household bills.',
      cta: 'Get Started',
    },
    phoneAuth: {
      title: 'Enter your phone number',
      subtitle: 'We will send a 6-digit verification code to keep your account secure.',
      placeholder: '0801 234 5678',
      button: 'Send Verification Code',
    },
  },

  move: {
    heroSearch: 'Where are you heading today?',
    quickRoutes: {
      work: 'Commute to Work',
      home: 'Return Home',
    },
    offerSeatsCTA: 'Driving this route? Offer empty seats',
    detourBadge: (mins: number) => `+${mins} min detour`,
    suggestedFare: (amountNgn: number) => `₦${amountNgn.toLocaleString()} suggested cost share`,
    pinPrompt: 'Share this 4-digit PIN with your driver upon boarding',
    pinSafetyNotice: 'Never enter a vehicle without confirming the driver enters your PIN.',
    safetyPill: {
      sos: 'Emergency SOS (615)',
      shareTrip: 'Share Live Trip',
      safetyStatus: 'Active Corridor Monitored',
    },
    emptyState: {
      title: 'Nobody is travelling this way yet',
      subtitle: 'Subscribe to this corridor to receive an instant alert when a neighbor posts a journey.',
      button: 'Save Route Subscription',
    },
  },

  stay: {
    heroTitle: 'Find your place in Ibadan',
    categories: {
      findHome: 'Entire Apartments',
      findRoom: 'Private Rooms',
      flatmates: 'Flatmate Match',
      nysc: 'NYSC Settle-In',
    },
    realMoveInTotalLabel: 'Real Move-In Total',
    realMoveInExplanation: 'Includes Annual Rent + Agency (10%) + Legal (10%) + Caution Deposit. No surprises.',
    splitCalculator: (numPeople: number, shareNgn: number) =>
      `Split with ${numPeople} flatmate${numPeople > 1 ? 's' : ''}: ₦${shareNgn.toLocaleString()} each`,
    amenities: {
      waterBorehole: 'Borehole Supply (24/7)',
      waterWell: 'Deep Well',
      powerPrepaid: 'Dedicated IBEDC Prepaid Meter',
      generatorHours: (hours: string) => `Generator: ${hours}`,
      solarInverter: 'Solar / Inverter Backup',
      gatedEstate: 'Gated Security Estate',
    },
    emptyState: {
      title: 'No matching properties found',
      subtitle: 'Try expanding your budget slider or searching along neighboring corridors like Bodija or Agbowo.',
      button: 'Reset Search Filters',
    },
  },

  household: {
    title: 'Shared Living Ledger',
    subtitle: 'Transparent utility bill splitting among verified flatmates.',
    addExpense: 'Log Shared Expense',
    categories: ['ELECTRICITY_PREPAID', 'WATER_TRUCK', 'SECURITY_DUES', 'CLEANING_ESTATE', 'DIESEL_GEN'],
    settledBadge: 'Settled on Ledger',
  },

  helpCenter: [
    {
      category: 'MOVE Safety',
      question: 'How does the 4-Digit Pickup PIN protect me?',
      answer:
        'Your 4-digit PIN is generated uniquely for each reservation. The driver cannot start the trip on their phone without entering this PIN, ensuring you never board the wrong vehicle or travel with an unapproved driver.',
    },
    {
      category: 'MOVE Safety',
      question: 'What happens if the driver takes an unexpected detour?',
      answer:
        'Our telemetry engine monitors the vehicle location every 10 seconds. If the car deviates more than 2 km from the corridor, you will receive an automatic in-app safety check-in, with instant 1-tap escalation to the Oyo State 615 emergency line.',
    },
    {
      category: 'STAY Rent Transparency',
      question: 'What is the Real Move-In Total guarantee?',
      answer:
        'Landlords and agents on weTag are legally bound to itemize every fee (rent, agency, legal, caution deposit, service charges). If an agent attempts to demand unlisted fees during a viewing, report them immediately for listing removal.',
    },
    {
      category: 'Payments & Wallet',
      question: 'How do driver payouts work?',
      answer:
        'Passenger contributions are credited to your Universal Wallet immediately upon trip completion. You can request an instant NUBAN payout to any Nigerian commercial bank via Paystack with zero transfer delays.',
    },
    {
      category: 'Emergency Dispatch',
      question: 'Who responds when I press the SOS button?',
      answer:
        'Pressing Emergency SOS dispatches your live GPS coordinates, vehicle plate number, driver details, and contact number directly to the Oyo State 615 Citizens Emergency Centre and sends an automated SMS link to your trusted contacts.',
    },
  ],
};

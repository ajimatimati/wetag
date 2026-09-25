/**
 * weTag Master Database Seed Script — Ibadan Launch Dataset
 * Pre-populates realistic, localized test data across Identity, Move, Stay, and Wallet.
 */

import { PrismaClient as IdentityPrisma } from './identity/node_modules/@prisma/client';
import { PrismaClient as MovePrisma } from './move/node_modules/@prisma/client';
import { PrismaClient as StayPrisma } from './stay/node_modules/@prisma/client';
import { PrismaClient as WalletPrisma } from './wallet/node_modules/@prisma/client';

const identityDb = new IdentityPrisma();
const moveDb = new MovePrisma();
const stayDb = new StayPrisma();
const walletDb = new WalletPrisma();

async function main() {
  console.log('🌱 Seeding weTag Ibadan Platform...');

  // ─────────────────────────────────────────────
  // 1. IDENTITY & ACCOUNTS
  // ─────────────────────────────────────────────
  console.log('👤 Creating Accounts & Profiles...');

  // User 1: Dr. Kunle Alabi (Driver + Commuter)
  const kunle = await identityDb.account.upsert({
    where: { phoneNumber: '+2348031112233' },
    update: {},
    create: {
      phoneNumber: '+2348031112233',
      firstName: 'Kunle',
      lastName: 'Alabi',
      email: 'kunle.alabi@ui.edu.ng',
      phoneVerifiedAt: new Date(),
      riderProfile: { create: { rating: 5.0, totalTrips: 18 } },
      driverProfile: {
        create: {
          driverType: 'SHARED_PRIVATE',
          isApproved: true,
          approvedAt: new Date(),
          rating: 4.9,
          totalJourneysShared: 42,
          reliabilityScore: 0.98,
          licenseNumber: 'OYO-DL-2024-8891',
        },
      },
      vehicles: {
        create: {
          make: 'Toyota',
          model: 'Corolla',
          year: 2016,
          color: 'Silver',
          plateNumber: 'OYO-412-BDJ',
          vehicleClass: 'SEDAN',
          seatCapacity: 4,
          hasAC: true,
          isApproved: true,
          approvedAt: new Date(),
        },
      },
      verifications: {
        create: [
          { type: 'PHONE_OTP', status: 'PASSED', verifiedAt: new Date() },
          { type: 'NIN', status: 'PASSED', verifiedAt: new Date() },
          { type: 'DRIVERS_LICENSE', status: 'PASSED', verifiedAt: new Date() },
        ],
      },
    },
    include: { vehicles: true },
  });

  // User 2: Tolu Olaniyi (Commuter + Household Tenant)
  const tolu = await identityDb.account.upsert({
    where: { phoneNumber: '+2348034445566' },
    update: {},
    create: {
      phoneNumber: '+2348034445566',
      firstName: 'Tolu',
      lastName: 'Olaniyi',
      email: 'tolu.olaniyi@gmail.com',
      phoneVerifiedAt: new Date(),
      riderProfile: { create: { rating: 4.95, totalTrips: 14 } },
      tenantProfile: {
        create: {
          totalTenancies: 1,
          sleepSchedule: 'EARLY_BIRD',
          cleanlinessLevel: 4,
          smokingPreference: 'NO_SMOKING',
          noisePreference: 'QUIET',
        },
      },
      verifications: {
        create: [
          { type: 'PHONE_OTP', status: 'PASSED', verifiedAt: new Date() },
          { type: 'NIN', status: 'PASSED', verifiedAt: new Date() },
        ],
      },
    },
  });

  // User 3: Alhaji Jimoh (Verified Landlord)
  const jimoh = await identityDb.account.upsert({
    where: { phoneNumber: '+2348027778899' },
    update: {},
    create: {
      phoneNumber: '+2348027778899',
      firstName: 'Jimoh',
      lastName: 'Akinwale',
      email: 'jimoh.realty@ibadan.ng',
      phoneVerifiedAt: new Date(),
      landlordProfile: {
        create: {
          totalProperties: 3,
          activeListings: 2,
          successfulRentals: 8,
          responseRate: 0.95,
        },
      },
    },
  });

  // ─────────────────────────────────────────────
  // 2. WALLET INITIALIZATION
  // ─────────────────────────────────────────────
  console.log('💳 Creating Universal Wallets & Seed Ledgers...');

  const toluWallet = await walletDb.wallet.upsert({
    where: { accountId: tolu.id },
    update: {},
    create: {
      accountId: tolu.id,
      availableBalance: 1450000, // ₦14,500 in kobo
      entries: {
        create: [
          {
            type: 'TOPUP',
            direction: 'CREDIT',
            amount: 2000000, // ₦20,000 topup
            domain: 'PLATFORM',
            description: 'Card Top-Up via Paystack',
            status: 'SETTLED',
            settledAt: new Date(),
          },
          {
            type: 'RIDE_CHARGE',
            direction: 'DEBIT',
            amount: 40000, // ₦400 Akobo ride
            domain: 'MOVE',
            description: 'Shared commute: Akobo ➔ Dugbe',
            status: 'SETTLED',
            settledAt: new Date(),
          },
          {
            type: 'EXPENSE_CHARGE',
            direction: 'DEBIT',
            amount: 510000, // ₦5,100 utility share
            domain: 'STAY',
            description: 'IBEDC Electricity Bill · July Share',
            status: 'SETTLED',
            settledAt: new Date(),
          },
        ],
      },
    },
  });

  // ─────────────────────────────────────────────
  // 3. MOVE: CORRIDOR JOURNEYS
  // ─────────────────────────────────────────────
  console.log('🚗 Creating Active Corridor Journeys in Ibadan...');

  const kunleVehicle = kunle.vehicles[0];

  const journey1 = await moveDb.driverJourney.create({
    data: {
      driverAccountId: kunle.id,
      vehicleId: kunleVehicle.id,
      originLat: 7.432,
      originLng: 3.935,
      originAddress: 'Akobo, General Gas Junction',
      originLandmark: 'Opposite Total Filling Station',
      destinationLat: 7.387,
      destinationLng: 3.878,
      destinationAddress: 'Dugbe, Cocoa House',
      destinationLandmark: 'Cocoa House Roundabout',
      totalSeats: 3,
      availableSeats: 2,
      maxDetourMinutes: 5,
      departureWindow: new Date(Date.now() + 30 * 60 * 1000), // in 30 mins
      suggestedContribution: 40000, // ₦400 in kobo
      tripMode: 'SHARED',
      status: 'OPEN',
      seatReservations: {
        create: {
          riderAccountId: tolu.id,
          pickupLat: 7.43,
          pickupLng: 3.933,
          pickupAddress: 'General Gas Smart Hub',
          dropoffLat: 7.388,
          dropoffLng: 3.879,
          dropoffAddress: 'Dugbe Commercial Hub',
          seatsBooked: 1,
          tripPin: '7391',
          contribution: 40000,
          platformFee: 4000,
          safetyReserve: 5000,
          paymentStatus: 'AUTHORIZED',
          status: 'MATCHED',
        },
      },
    },
  });

  // ─────────────────────────────────────────────
  // 4. STAY: VERIFIED PROPERTIES & HOUSEHOLDS
  // ─────────────────────────────────────────────
  console.log('🏠 Creating Verified Properties & Move-In Ledgers...');

  const bodijaProp = await stayDb.property.create({
    data: {
      ownerId: jimoh.id,
      address: 'Plot 14, Awolowo Avenue, Old Bodija',
      neighborhood: 'Old Bodija',
      city: 'Ibadan',
      propertyType: 'APARTMENT_2BED',
      bedrooms: 2,
      bathrooms: 2,
      waterSource: 'BOREHOLE',
      powerSetup: 'PREPAID_METER',
      meterType: 'IBEDC_PREPAID',
      hasGenerator: true,
      generatorHours: '6PM - 6AM',
      securityType: 'ESTATE_SECURITY',
      parkingSpaces: 2,
      isFenced: true,
      isGated: true,
      isVerified: true,
      verifiedAt: new Date(),
      imageHashes: ['phash_8a7f92b4c10e3d5a'],
      listings: {
        create: {
          listerId: jimoh.id,
          title: 'Spacious 2-Bedroom Flat in Old Bodija Estate',
          description:
            'Serene, well-paved estate environment with 24/7 borehole supply and dedicated IBEDC prepaid meter.',
          photos: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
          ],
          furnishingStatus: 'SEMI_FURNISHED',
          rentAmount: 70000000, // ₦700,000
          rentFrequency: 'ANNUALLY',
          agencyFee: 7000000, // ₦70,000 (10%)
          legalFee: 7000000, // ₦70,000 (10%)
          cautionDeposit: 5000000, // ₦50,000
          serviceCharge: 0,
          otherFees: 0,
          status: 'ACTIVE',
        },
      },
    },
  });

  // Household with active utility ledger
  const household = await stayDb.household.create({
    data: {
      propertyId: bodijaProp.id,
      name: 'The Bodija 2-Bed Residence',
      totalRent: 70000000,
      rentDueDay: 1,
      members: {
        create: [
          { accountId: tolu.id, rentSharePercent: 50, role: 'ORGANIZER' },
          { accountId: kunle.id, rentSharePercent: 50, role: 'TENANT' },
        ],
      },
      rules: {
        create: [
          { category: 'NOISE', ruleText: 'Quiet hours after 10 PM on weekdays', agreedByAll: true },
          { category: 'CLEANING', ruleText: 'Common kitchen area cleaned immediately after use', agreedByAll: true },
        ],
      },
      expenses: {
        create: {
          paidByAccountId: tolu.id,
          description: 'IBEDC Electricity Recharge (August)',
          amount: 1840000, // ₦18,400
          category: 'ELECTRICITY',
          splitType: 'EQUAL',
        },
      },
    },
  });

  console.log('✅ Master seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await identityDb.$disconnect();
    await moveDb.$disconnect();
    await stayDb.$disconnect();
    await walletDb.$disconnect();
  });

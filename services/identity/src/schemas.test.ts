import {
  RequestOtpSchema,
  VerifyOtpSchema,
  CreateVehicleSchema,
  CreateTrustedContactSchema,
} from './schemas';

describe('Identity Validation Schemas', () => {
  test('RequestOtpSchema validates valid Nigerian E.164 numbers', () => {
    const valid = RequestOtpSchema.safeParse({ phoneNumber: '+2348012345678' });
    expect(valid.success).toBe(true);

    const invalidShort = RequestOtpSchema.safeParse({ phoneNumber: '08012345678' });
    expect(invalidShort.success).toBe(false);

    const invalidCountry = RequestOtpSchema.safeParse({ phoneNumber: '+12025550199' });
    expect(invalidCountry.success).toBe(false);
  });

  test('VerifyOtpSchema requires exactly 6-digit numeric codes', () => {
    const valid = VerifyOtpSchema.safeParse({
      phoneNumber: '+2348012345678',
      code: '739102',
    });
    expect(valid.success).toBe(true);

    const alphaCode = VerifyOtpSchema.safeParse({
      phoneNumber: '+2348012345678',
      code: '73910A',
    });
    expect(alphaCode.success).toBe(false);

    const shortCode = VerifyOtpSchema.safeParse({
      phoneNumber: '+2348012345678',
      code: '7391',
    });
    expect(shortCode.success).toBe(false);
  });

  test('CreateVehicleSchema validates vehicle classification and seat limits', () => {
    const valid = CreateVehicleSchema.safeParse({
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      color: 'Silver',
      plateNumber: 'OYO-123-AGD',
      vehicleClass: 'SEDAN',
      seatCapacity: 4,
      hasAC: true,
    });
    expect(valid.success).toBe(true);

    const invalidSeats = CreateVehicleSchema.safeParse({
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      color: 'Silver',
      plateNumber: 'OYO-123-AGD',
      seatCapacity: 0,
    });
    expect(invalidSeats.success).toBe(false);
  });

  test('CreateTrustedContactSchema requires valid Nigerian phone', () => {
    const valid = CreateTrustedContactSchema.safeParse({
      name: 'Adewale Olaniyi',
      phoneNumber: '+2348023456789',
      relationship: 'Brother',
      autoShareTrips: true,
      autoShareViewings: true,
    });
    expect(valid.success).toBe(true);
  });
});

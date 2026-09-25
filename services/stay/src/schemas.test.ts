import {
  CreateListingSchema,
  CreateHouseholdSchema,
  CreateSharedExpenseSchema,
} from './schemas';

describe('STAY Validation Schemas', () => {
  test('CreateListingSchema validates itemized fee breakdown', () => {
    const valid = CreateListingSchema.safeParse({
      propertyId: '123e4567-e89b-12d3-a456-426614174000',
      title: '2-Bedroom in Old Bodija Estate',
      photos: ['https://storage.wetag.ng/photos/prop1.jpg'],
      rentAmount: 60000000, // ₦600,000 in kobo
      rentFrequency: 'ANNUALLY',
      agencyFee: 6000000, // ₦60,000 (10%)
      legalFee: 6000000, // ₦60,000 (10%)
      cautionDeposit: 5000000, // ₦50,000
      serviceCharge: 0,
      otherFees: 0,
    });
    expect(valid.success).toBe(true);

    if (valid.success) {
      const totalMoveIn =
        valid.data.rentAmount +
        valid.data.agencyFee +
        valid.data.legalFee +
        valid.data.cautionDeposit +
        valid.data.serviceCharge +
        valid.data.otherFees;
      expect(totalMoveIn).toBe(77000000); // ₦770,000 in kobo
    }
  });

  test('CreateHouseholdSchema requires member list and property ID', () => {
    const valid = CreateHouseholdSchema.safeParse({
      propertyId: '123e4567-e89b-12d3-a456-426614174000',
      name: 'The Bodija 3-Bed',
      totalRent: 120000000, // ₦1.2M in kobo
      rentDueDay: 1,
      members: [
        {
          accountId: '123e4567-e89b-12d3-a456-426614174001',
          rentSharePercent: 40,
          role: 'ORGANIZER',
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174002',
          rentSharePercent: 30,
          role: 'TENANT',
        },
        {
          accountId: '123e4567-e89b-12d3-a456-426614174003',
          rentSharePercent: 30,
          role: 'TENANT',
        },
      ],
    });
    expect(valid.success).toBe(true);
    if (valid.success) {
      const sum = valid.data.members.reduce((acc, m) => acc + m.rentSharePercent, 0);
      expect(sum).toBe(100);
    }
  });

  test('CreateSharedExpenseSchema accepts categories like ELECTRICITY and GENERATOR_FUEL', () => {
    const validPower = CreateSharedExpenseSchema.safeParse({
      description: 'IBEDC Prepaid Recharge - August',
      amount: 1840000, // ₦18,400 in kobo
      category: 'ELECTRICITY',
      splitType: 'EQUAL',
    });
    expect(validPower.success).toBe(true);
  });
});

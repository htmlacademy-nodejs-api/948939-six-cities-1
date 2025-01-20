export const CreateUpdateOfferMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  rating: {
    minValue: 'Minimum rating length must be 1',
    maxValue: 'Maximum rating length must be 5',
  },
  roomsCount: {
    invalidFormat: 'roomsCount must be an integer',
    minValue: 'Minimum roomsCount length must be 1',
    maxValue: 'Maximum roomsCount length must be 8',
  },
  guestsCount: {
    invalidFormat: 'guestsCount must be an integer',
    minValue: 'Minimum guestsCount length must be 1',
    maxValue: 'Maximum guestsCount length must be 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  amenities: {
    notArray: 'amenities must be an array',
    invalid: 'amenities must be in array [Breakfast, AirConditioning, LaptopFriendlyWorkspace, BabySeat, Washer, Towels, Fridge]',
  },
  commentsCount: {
    invalidFormat: 'commentsCount must be an integer',
  },
  type: {
    invalid: 'amenities must be in array [Apartment, House, Room, Hotel]'
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    minLength: 'Minimum description length must be 5',
    maxLength: 'Maximum description length must be 1024',
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: 'Minimum rating value must be 1',
    maxValue: 'Maximum rating value must be 5'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;

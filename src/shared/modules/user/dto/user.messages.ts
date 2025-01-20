export const UserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  type: {
    invalid: 'type must be in Ordinary or Pro',
  },
  name: {
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
} as const;

export const LoginUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
} as const;

const ApiRoute = {
  SEND_CODE_FOR_RESTORE_PASSWORD: '/email/forgot-password',
  CONFIRM_CODE_FOR_RESTORE_PASSWORD: '/auth/confirm-email',
  ADD_VERIFICATION_DATA: '/verification/create',
} as const;

export { ApiRoute };

const ApiRoute = {
  SEND_CODE_FOR_RESTORE_PASSWORD: '/email/forgot-password',
  CONFIRM_CODE_FOR_RESTORE_PASSWORD: '/auth/confirm-email',
  ADD_VERIFICATION_DATA: '/verification/update',
  GET_USER_BY_ID: '/user/id',
  QOBRIX_CREATE_CONTACT: '/contacts',
  QOBRIX_CREATE_AGENT: '/agents',
} as const;

export { ApiRoute };

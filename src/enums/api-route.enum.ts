const ApiRoute = {
  SEND_CODE_FOR_RESTORE_PASSWORD: '/email/forgot-password',
  CONFIRM_CODE_FOR_RESTORE_PASSWORD: '/auth/confirm-email',
  CONFIRM_RESTORE_PASSWORD: '/auth/restore-password',
  ADD_VERIFICATION_DATA: '/verification/update',
  UPDATE_PROFILE_DATA: '/user/update',
  SET_AVATAR: '/user/set-avatar',
  GET_USER_BY_ID: '/user/id',
  VERIFY_OLD_PASSWORD: '/auth/verify-password',
  CHANGE_PASSWORD: '/auth/change-password',
  UPDATE_USER: '/user/id',

  QOBRIX_CREATE_CONTACT: '/contacts',
  QOBRIX_CREATE_AGENT: '/agents',
  DELETE_USER: '/user',
} as const;

export { ApiRoute };

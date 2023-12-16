const ApiRoute = {
  SEND_CODE_FOR_RESTORE_PASSWORD: '/email/forgot-password',
  CONFIRM_CODE_FOR_RESTORE_PASSWORD: '/auth/confirm-email',
  CONFIRM_RESTORE_PASSWORD: '/auth/restore-password',
  ADD_VERIFICATION_DATA: '/verification/update',
  UPDATE_PROFILE_DATA: '/user/update',
  SET_AVATAR: '/user/set-avatar',
  DELETE_AVATAR: '/user/delete-avatar',
  GET_USER_BY_ID: '/user/id',
  VERIFY_OLD_PASSWORD: '/auth/verify-password',
  CHANGE_PASSWORD: '/auth/change-password',
  UPDATE_USER: '/user/id',
  DELETE_USER: '/user',
  QOBRIX_CREATE_CONTACT: '/contacts',
  QOBRIX_CREATE_AGENT: '/agents',
  QOBRIX_PROPERY_TYPES: '/property-types',
  QOBRIX_OPPORTUNITIES: '/opportunities',
} as const;

export { ApiRoute };

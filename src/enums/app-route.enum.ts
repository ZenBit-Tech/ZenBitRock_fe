const AppRoute = {
  HOME_PAGE: '/',
  VERIFY_PAGE: '/verify-email',
  SIGN_IN_PAGE: '/sign-in',
  SIGN_UP_PAGE: '/sign-up',
  VERIFICATION_PAGE: '/verification',
  VERIFICATION_DONE_PAGE: '/verification/done',
  RESTORE_PASSWORD_PAGE: '/restore-password',
  RESTORE_PASSWORD_VERIFY_CODE_PAGE: '/restore-password/verify-code',
  RESTORE_PASSWORD_CHANGE_PASSWORD_PAGE: '/restore-password/change-password',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  MAIN_PAGE: '/main-page',
  RESTORE_PASSWORD_DONE_PAGE: '/restore-password/restore-password-done',
  PROFILE_PAGE: '/profile',
  VERIFY_OLD_PASSWORD: 'reset-password/verify-old-password',
  RESET_PASSWORD_CHANGE_PASSWORD_PAGE: '/reset-password/change-password',
  RESET_PASSWORD_DONE_PAGE: '/reset-password',
  MESSAGES_PAGE: '/messages',
  EDIT_PROFILE_PAGE: '/edit-profile',
} as const;

export { AppRoute };

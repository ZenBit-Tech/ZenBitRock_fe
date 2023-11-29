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
  ADD_VERIFICATION_DATA: '/verification/create',
  RESTORE_PASSWORD_DONE_PAGE: '/restore-password/restore-password-done',
} as const;

export { AppRoute };
const ROOTS = {
  AUTH: '/auth',
  USER: `/profile`,
  EDIT_USER: `/edit-profile`,
};

export const paths = {
  auth: {
    login: `${ROOTS.AUTH}/sign-in`,
    register: `${ROOTS.AUTH}/sign-up`,
    newPassword: `${ROOTS.AUTH}/new-password`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    main: `${ROOTS.AUTH}/main-page`,
  },
  user: {
    profile: `${ROOTS.USER}`,
    editProfile: `${ROOTS.EDIT_USER}`,
  },
};

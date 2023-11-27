const ROOTS = {
  AUTH: '/auth',
};

export const paths = {
  auth: {
    login: `${ROOTS.AUTH}/sign-in`,
    register: `${ROOTS.AUTH}/sign-up`,
    newPassword: `${ROOTS.AUTH}/new-password`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
  },
};

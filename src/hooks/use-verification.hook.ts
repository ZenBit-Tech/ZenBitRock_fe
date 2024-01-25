import { AppRoute } from 'enums';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { ValueOf } from 'types';

type Props = {
  defaultRedirectPath: ValueOf<typeof AppRoute>;
};

const useVerification = ({ defaultRedirectPath }: Props) => {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const isEmailVerified = user ? user.isVerified : false;
  const isKycFilled = user ? user.firstName && user.lastName : false;
  const isUserNewbie = user ? user.isNewbie : false;

  let redirectPath = defaultRedirectPath;

  if (user && !isKycFilled) {
    redirectPath = AppRoute.VERIFICATION_PAGE;
  }

  if (user && isKycFilled && isUserNewbie) {
    redirectPath = AppRoute.VERIFICATION_PAGE;
  }

  if (user && !isEmailVerified) {
    redirectPath = AppRoute.VERIFY_PAGE;
  }

  if (user && isKycFilled && defaultRedirectPath === AppRoute.VERIFICATION_PAGE) {
    if (isEmailVerified && isUserNewbie) {
      redirectPath === AppRoute.VERIFICATION_PAGE;
    } else {
      redirectPath = isEmailVerified ? AppRoute.MAIN_PAGE : AppRoute.VERIFY_PAGE;
    }
  }

  if (user && isEmailVerified && defaultRedirectPath === AppRoute.VERIFY_PAGE) {
    redirectPath = isKycFilled ? AppRoute.MAIN_PAGE : AppRoute.VERIFICATION_PAGE;
  }

  return { user, isEmailVerified, isKycFilled, redirectPath };
};

export { useVerification };

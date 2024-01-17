'use client';

import Joyride, { CallBackProps } from 'react-joyride';
import disableScroll from 'disable-scroll';
import { useMemo, useTranslations, useMount, useRouter } from 'hooks';
import { colors } from 'constants/colors';
import { AppRoute } from 'enums';
import { onboardingSteps } from './onboarding-steps';
import { useOnboardingContext } from './context';

export const DELAY: number = 500;

export function Onboarding(): JSX.Element {
  const t = useTranslations('onboarding');

  const {
    setState,
    state: { run, stepIndex, steps },
  } = useOnboardingContext();

  const router = useRouter();

  if (run) {
    disableScroll.on();
  } else {
    disableScroll.off();
  }

  const LOCALE = useMemo(
    () => ({
      back: t('backButton'),
      close: t('closeButton'),
      last: t('lastButton'),
      next: t('nextButton'),
      open: t('openDialogButton'),
      skip: t('skipButton'),
    }),
    [t]
  );

  useMount(() => {
    setState({
      steps: onboardingSteps,
    });
  });

  const handleCallback = (data: CallBackProps) => {
    const { action, index, type } = data;

    if (type === 'step:after') {
      setState({ run: true, stepIndex: action === 'prev' ? index - 1 : index + 1 });
    }
    if (action === 'reset' || action === 'skip' || type === 'tour:end') {
      setState({ run: false, stepIndex: 0, tourActive: false });
    }
    if (type === 'step:after' && index === 5 && action === 'next') {
      setState({ run: false });
      router.push(AppRoute.LEADS_PAGE);
    }
    if (type === 'step:after' && index === 8 && action === 'next') {
      setState({ run: false });
      router.push(AppRoute.AGENTS_PAGE);
    }
    if (type === 'step:after' && index === 11 && action === 'next') {
      setState({ run: false });
      router.push(AppRoute.CHATS_PAGE);
    }
  };

  return (
    <Joyride
      callback={handleCallback}
      continuous
      run={run}
      stepIndex={stepIndex}
      steps={steps}
      locale={LOCALE}
      showSkipButton
      disableScrolling
      disableCloseOnEsc
      disableOverlayClose
      hideCloseButton
      scrollToFirstStep
      styles={{
        options: {
          zIndex: 10000,
          textColor: `${colors.BUTTON_PRIMARY_COLOR}`,
          primaryColor: `${colors.BUTTON_PRIMARY_COLOR}`,
        },
      }}
    />
  );
}

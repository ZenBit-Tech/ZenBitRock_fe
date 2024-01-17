import { Typography } from '@mui/material';
import { Step } from 'react-joyride';
import i18n from 'locales/118n';

const STEPS_COUNT = 15;

const stepsText: string[] = [];

for (let i = 0; i < STEPS_COUNT; i += 1) {
  if (i18n.isInitialized) stepsText.push(i18n.t(`onboarding.step${i}`));
}

export const onboardingSteps: Step[] = [
  {
    content: <Typography variant="h3">{stepsText[0]}</Typography>,
    spotlightPadding: 0,
    placement: 'center',
    target: 'body',
  },
  {
    content: <Typography variant="h3">{stepsText[1]}</Typography>,
    spotlightPadding: 0,
    placement: 'center',
    target: '.onboarding-step-1',
  },
  {
    content: <Typography variant="h3">{stepsText[2]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-2',
  },
  {
    content: <Typography variant="h3">{stepsText[3]}</Typography>,
    spotlightPadding: 2,
    target: '.onboarding-step-3',
  },
  {
    content: <Typography variant="h3">{stepsText[4]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-4',
  },
  {
    content: <Typography variant="h3">{stepsText[5]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-5',
  },
  {
    content: <Typography variant="h3">{stepsText[6]}</Typography>,
    spotlightPadding: 0,
    hideBackButton: true,
    placement: 'center',
    target: '.onboarding-step-6',
  },
  {
    content: <Typography variant="h3">{stepsText[7]}</Typography>,
    spotlightPadding: 0,
    target: '.onboarding-step-7',
  },
  {
    content: <Typography variant="h3">{stepsText[8]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-8',
  },
  {
    content: <Typography variant="h3">{stepsText[9]}</Typography>,
    spotlightPadding: 0,
    hideBackButton: true,
    placement: 'center',
    target: '.onboarding-step-9',
  },
  {
    content: <Typography variant="h3">{stepsText[10]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-10',
  },
  {
    content: <Typography variant="h3">{stepsText[11]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-11',
  },
  {
    content: <Typography variant="h3">{stepsText[12]}</Typography>,
    spotlightPadding: 0,
    hideBackButton: true,
    placement: 'center',
    target: '.onboarding-step-12',
  },
  {
    content: <Typography variant="h3">{stepsText[13]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-13',
  },
  {
    content: <Typography variant="h3">{stepsText[14]}</Typography>,
    spotlightPadding: 4,
    target: '.onboarding-step-14',
  },
];

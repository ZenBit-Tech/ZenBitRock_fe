import { memo } from 'react';

import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import BackgroundShape from 'assets/illustrations/background-shape';
import { backgroundImages } from 'constants/backgroundImgLinks';
import { colors } from 'constants/colors';

function PageNotMatchedIllustration({ ...other }: BoxProps) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <BackgroundShape />

      <image href={`${backgroundImages.BG_NOT_MATCHED_PAGE}`} height="300" x="205" y="30" />

      <path
        fill={`${colors.SUN}`}
        d="M111.1 141.2c58.7-1 58.6-88.3 0-89.2-58.6 1-58.6 88.3 0 89.2z"
        opacity="0.12"
      />

      <path
        fill={`${colors.SUN} d="M111.1 120c30.8-.5 30.8-46.3 0-46.8-30.8.5-30.8 46.3 0 46.8z`}
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_119"
          x1="78.3"
          x2="78.3"
          y1="187.77"
          y2="305.935"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_LIGHT} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
      </defs>
    </Box>
  );
}

export default memo(PageNotMatchedIllustration);

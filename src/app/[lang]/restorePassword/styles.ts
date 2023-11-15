'use client';

import { styled } from '@mui/material';
import { colors } from 'constants/colors';

export const Wrapper = styled('div')`
  display: flex;
  height: calc(100vh - 80px);
  max-width: 1440px;
`;

export const LeftSection = styled('div')`
  flex: 2;
  background-image: url(${colors.BG_LOGIN_PAGE});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightSection = styled('div')`
  flex: 1;
`;

export const RestoreWrapper = styled('div')`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px;
`;

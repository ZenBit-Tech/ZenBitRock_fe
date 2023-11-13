'use client';

import { Box, styled } from '@mui/material';

const FONT_FAMILY =
  "system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";

export const Wrapper = styled('div')`
  display: flex;
  height: calc(100vh - 80px);
  font-family: ${FONT_FAMILY};
`;

export const LeftSection = styled('div')`
  flex: 1.2;
  background-image: url('https://w.forfun.com/fetch/6c/6c0cf748db116fabaa70199a35327258.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightSection = styled('div')`
  flex: 1;
`;

export const FormWrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 80px 0;
  width: 70%;
  margin: 0 auto;
`;

export const StyledFormWrapper = styled(Box)(({ theme }) => ({
  width: '95%',
  [theme.breakpoints.up('sm')]: {
    width: '85%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '70%',
  },
  [theme.breakpoints.up('xl')]: {
    width: '50%',
  },
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '80px 0',
  margin: '0 auto',
}));

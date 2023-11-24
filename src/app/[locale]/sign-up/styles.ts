'use client';
import { Box, styled } from '@mui/material';
import { colors } from 'constants/colors';

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;

  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`;

export const SignInLink = styled('div')`
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;
export const Policy = styled('div')`
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Link = styled('a')`
  display: inline;
  color: ${colors.SIGN_IN_LINKS_COLOR};
`;

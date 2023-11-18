'use client';
import { styled } from '@mui/material';
import { colors } from 'constants/colors';

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
  width: 70%;
`;

export const Link = styled('a')`
  display: inline;
  color: ${colors.SIGN_IN_LINKS_COLOR};
`;

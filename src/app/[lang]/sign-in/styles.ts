'use client';

import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  height: calc(100vh - 80px);
`;

export const LeftSection = styled('div')`
  flex: 2;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightSection = styled('div')`
  flex: 1;
`;

export const LoginWrapper = styled('div')`
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px;
`;

export const SignUpLink = styled('div')`
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
`;

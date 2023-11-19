'use client';

import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  height: calc(100vh - 80px);
  padding: 24px;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const LeftSection = styled('div')`
  flex: 2;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: fit-content;
`;

export const RightSection = styled('div')`
  flex: 1;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export const LoginWrapper = styled('div')`
  /* height: calc(100vh - 80px); */
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 1024px) {
    align-items: flex-start;
  }
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

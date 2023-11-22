'use client';

import { Box, styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  padding: 24px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    height: calc(100vh - 80px);
  }
`;

export const LeftSection = styled('div')`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const RightSection = styled(Box)`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  flex: 2;
  align-self: center;
  gap: 4rem;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

export const StyledBtnWrapper = styled(Box)`
  display: flex;
  align-self: center;

  @media (min-width: 768px) {
    display: flex;
    align-self: flex-end;
  }
`;

export const LoginWrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
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

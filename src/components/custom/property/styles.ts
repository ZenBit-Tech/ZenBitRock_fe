'use client';

import { styled, Typography, Button, List, Box, CardMedia } from '@mui/material';

export const CardMediaStyled = styled(CardMedia)`
  height: 100px;
  @media (min-width: 1024px) {
    height: 200px;
  }
`;

export const BoxStyled = styled(Box)`
  margin-bottom: 0.75rem;
  @media (min-width: 1024px) {
    margin-bottom: 1rem;
  }
`;

export const ListStyled = styled(List)`
  padding-bottom: 56px;
  @media (min-width: 1024px) {
    padding-bottom: 64px;
  }
`;

export const Title = styled(Typography)`
  white-space: nowrap;
`;

export const TextStyled = styled(Typography)`
  white-space: nowrap;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const TextMiddleStyled = styled(Typography)`
  white-space: nowrap;
  font-size: 0.75rem;
  margin-bottom: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const ButtonStyled = styled(Button)`
  height: 2rem;
  width: 100%;
`;

export const TypographyStyled = styled(Typography)`
  white-space: nowrap;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const Wrapper = styled(Box)`
  display: 'flex';
  flex-direction: 'column';
  width: '90%';
  margin: '0 auto';
  border-radius: '8px';
`;

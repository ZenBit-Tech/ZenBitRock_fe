'use client';

import { styled, Typography, Button, List, Box, CardMedia } from '@mui/material';

export const CardMediaStyled = styled(CardMedia)`
  height: 150px;
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
  font-size: 0.75rem;
  margin-bottom: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

export const LinkStyled = styled(Button)`
  width: 100%;
  padding: 14px;

  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TypographyStyled = styled(Typography)`
  white-space: nowrap;
  font-size: 0.75rem;
`;

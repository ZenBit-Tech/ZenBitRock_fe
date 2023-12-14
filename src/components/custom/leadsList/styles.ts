'use client';

import { styled, Typography, List } from '@mui/material';

export const ListStyled = styled(List)`
  padding-bottom: 56px;
  @media (min-width: 1024px) {
    padding-bottom: 64px;
  }
`;

export const TextStyled = styled(Typography)`
  white-space: nowrap;
  font-size: 0.75rem;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

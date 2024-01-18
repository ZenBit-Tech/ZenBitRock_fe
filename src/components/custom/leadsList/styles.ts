'use client';

import Link from 'next/link';
import { styled, Typography, List, Box } from '@mui/material';
import { colors } from 'constants/colors';

export const ListStyled = styled(List)`
  padding-bottom: 56px;
  @media (min-width: 1024px) {
    padding-bottom: 64px;
  }
`;

export const TextStyled = styled(Typography)`
  white-space: nowrap;
  font-size: 0.875rem;
  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const LinkStyled = styled(Link)`
  display: none;
`;

export const BoxStyledWithName = styled(Box)`
  width: fit-content;
  height: auto;
  border-color: ${colors.PRIMARY_DARK_COLOR};
  border-style: solid;
  border-width: 1px;
  border-radius: 0.375rem;
  padding: 0.375rem;
  position: relative;
  margin-bottom: 1rem;
  cursor: default;

  &:hover > a {
    display: block;
  }
`;

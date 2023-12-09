'use client';

import { styled, Typography, Button, List, Box, CardMedia } from '@mui/material';
import Iconify from 'components/iconify';

export const Wrapper = styled(Box)`
  padding-bottom: 56px;
  @media (min-width: 1024px) {
    padding-bottom: 64px;
  }
`;

export const BoxDescriptionItem = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @media (min-width: 1024px) {
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

export const TypographyDescriptionLeft = styled(Typography)`
  white-space: nowrap;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const TypographyDescriptionRight = styled(Typography)`
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const IconifyStyled = styled(Iconify)`
  &:hover {
    color: #007867;
  }
`;

'use client';

import { styled, Typography, Button, Box } from '@mui/material';

import Iconify from 'components/iconify';
import { colors } from 'constants/colors';

export const Wrapper = styled(Box)`
  padding-bottom: 56px;
  @media (min-width: 1024px) {
    padding-bottom: 64px;
  }
`;

export const BoxDescriptionItem = styled(Box)`
  position: relative;
  margin-bottom: 1rem;
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      ${colors.PRIMARY_LIGHT_COLOR} 0%,
      ${colors.BUTTON_PRIMARY_COLOR} 50%,
      ${colors.PRIMARY_LIGHT_COLOR} 100%
    );
    left: 0;
    bottom: -0.5rem;
    z-index: 100;
  }
`;

export const Title = styled(Typography)`
  white-space: nowrap;
`;

export const TextStyled = styled(Typography)`
  position: relative;
  white-space: nowrap;
  font-size: 0.75rem;
  &.price {
    font-size: 1rem;
  }
  &.underline {
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        ${colors.PRIMARY_LIGHT_COLOR} 0%,
        ${colors.BUTTON_PRIMARY_COLOR} 50%,
        ${colors.PRIMARY_LIGHT_COLOR} 100%
      );
      left: 0;
      bottom: -0.5rem;
      z-index: 100;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1rem;
    &.price {
      font-size: 1.25rem;
    }
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
  display: block;
  flex: 3;
  white-space: nowrap;
  font-size: 0.75rem;
  font-weight: 700;
  margin-right: 1rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const TypographyDescriptionRight = styled(Typography)`
  display: block;
  flex: 5;
  font-size: 0.75rem;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }
`;

export const IconifyStyled = styled(Iconify)`
  &:hover {
    color: ${colors.BUTTON_SECOND_COLOR};
  }
`;

export const TypographyInsert = styled(Typography)`
  white-space: nowrap;

  display: inline-block;
  position: relative;
  font-size: 0.75rem;
  width: fit-content;

  @media (min-width: 1024px) {
    font-size: 1rem;
  }

  &:not(:last-child) {
    margin-right: 1rem;
    &::after {
      content: '|';
      position: absolute;
      right: -0.5rem;
    }
  }
`;

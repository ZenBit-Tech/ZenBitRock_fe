'use client';

import { styled, Typography, Link, CardMedia } from '@mui/material';

export const Title = styled(Typography)`
  font-size: 1rem;
`;

export const TextFieldStyled = styled(Typography)`
  font-size: 1rem;
`;

export const CardMediaStyled = styled(CardMedia)`
  & ~ img {
    width: 500px;
  }
`;

export const LinkStyled = styled(Link)`
  cursor: pointer;
  height: 2rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover,
  &:focus {
    transform: scale(1.01);
    text-decoration: none;
    color: blue;
  }
`;

export const TypographyStyled = styled(Typography)`
  font-size: 1rem;
  white-space: nowrap;
`;

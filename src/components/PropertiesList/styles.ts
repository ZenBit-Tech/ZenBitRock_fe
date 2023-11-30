'use client';

import { styled, Typography, Link, ListItem, TextField } from '@mui/material';

export const Title = styled(Typography)`
  font-size: 1rem;
`;

export const TextFieldStyled = styled(TextField)`
  font-size: 1rem;
`;

export const ListItemStyled = styled(ListItem)`
  display: 'flex';
  justify-content: 'center';
  align-items: 'center';
  flex-direction: 'column';
  width: '45%';
`;

export const LinkStyled = styled(Link)`
  height: 2rem;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TypographyStyled = styled(Typography)`
  font-size: 1rem;
`;

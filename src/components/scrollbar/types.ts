import { Theme, SxProps } from '@mui/material/styles';
import { Props } from 'simplebar-react';
// @mui

// ----------------------------------------------------------------------

export interface ScrollbarProps extends Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

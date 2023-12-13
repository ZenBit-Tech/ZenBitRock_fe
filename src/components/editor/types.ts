import { Theme, SxProps } from '@mui/material/styles';
import { ReactQuillProps } from 'react-quill';
// @mui

// ----------------------------------------------------------------------

export interface EditorProps extends ReactQuillProps {
  error?: boolean;
  simple?: boolean;
  helperText?: React.ReactNode;
  sx?: SxProps<Theme>;
}

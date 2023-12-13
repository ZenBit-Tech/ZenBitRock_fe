import { Link } from '@mui/material';
import { ReactNode, FC } from 'react';
import { colors } from 'constants/colors';

interface CustomLinkProps {
  href: string;
  color?: string;
  children: ReactNode;
}

const CustomLink: FC<CustomLinkProps> = ({ href, color = colors.TEST_MAIN_COLOR, children }) => (
  <Link underline="none" color={color} href={href}>
    {children}
  </Link>
);

export { CustomLink };

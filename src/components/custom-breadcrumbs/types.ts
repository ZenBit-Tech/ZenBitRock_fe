import { BreadcrumbsProps } from '@mui/material/Breadcrumbs';

export type BreadcrumbsLinkProps = {
  name?: string | null;
  email?: string;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: BreadcrumbsLinkProps[];
}

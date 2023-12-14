'use client';
import { styled } from '@mui/material';

export interface PageTitleProps {
  title: string;
}

const StyledPageTitle = styled('h1')`
  margin-bottom: 1.5rem;
`;

function PageTitle({ title }: PageTitleProps) {
  return <StyledPageTitle>{title}</StyledPageTitle>;
}

export default PageTitle;

'use client';

import { Typography } from '@mui/material';
import { useParams } from 'next/navigation';

export default function PropertyPage(): JSX.Element {
  const { id } = useParams();

  return (
    <Typography p={20} textAlign="center" variant="h1">
      {id}
    </Typography>
  );
}

'use client';

import Property from 'components/custom/property';
import { useParams } from 'next/navigation';

export default function PropertyPage(): JSX.Element {
  const params = useParams();
  const { id } = params;

  return <Property id={id} />;
}

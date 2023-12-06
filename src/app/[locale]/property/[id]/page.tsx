'use client';

import Property from 'components/custom/property';
import { useParams } from 'next/navigation';

export default function PropertyPage() {
  const params = useParams();
  const { id } = params;

  console.log(params);

  return <Property id={id} />;
}

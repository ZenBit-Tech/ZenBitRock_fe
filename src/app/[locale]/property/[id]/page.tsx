'use client';

import { useParams } from 'next/navigation';
import Property from 'components/custom/property';

export default function PropertyPage(): JSX.Element {
  const { id } = useParams();
  const propertyId = Array.isArray(id) ? id[0] : id;

  return <Property id={propertyId} />;
}

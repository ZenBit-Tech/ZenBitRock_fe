'use client';

import Property from 'components/custom/property';
import { useParams } from 'next/navigation';

export default function PropertyPage(): JSX.Element {
  const { id } = useParams();
  const propertyId = Array.isArray(id) ? id[0] : id;

  return <Property id={propertyId} />;
}

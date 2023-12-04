'use client';

import Property from 'components/custom/property';
import { useRouter } from 'next/navigation';

export default function PropertyPage() {
  const router = useRouter();

  console.log(router);

  return <Property />;
}

'use client';

import Property from 'components/custom/property';
import { useRouter } from 'next/router';

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;

  console.log(id);

  return <Property id={id && id} />;
}

import { useRouter } from 'next/router';

export default function PropertyPage() {
  const router = useRouter();
  return <Property id={router.query.id} />;
}

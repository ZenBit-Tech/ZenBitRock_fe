import { ProtectedRoute } from 'components/custom';
import { CompactLayout } from 'layouts';

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Verify Email',
};

export default function Layout({ children }: Props) {
  return (
    <ProtectedRoute>
      <CompactLayout>{children}</CompactLayout>
    </ProtectedRoute>
  );
}

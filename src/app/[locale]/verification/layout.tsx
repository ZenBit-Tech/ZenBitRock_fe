import { ProtectedRoute } from 'components/custom';

export const metadata = {
  title: 'Verification',
};

type Props = {
  children: React.ReactNode;
};

export default function TestLayout({ children }: Props): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

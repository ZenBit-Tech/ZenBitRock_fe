import { ProtectedRoute } from 'components/custom';

export const metadata = {
  title: 'Guide',
};

type Props = {
  children: React.ReactNode;
};

export default function GuideLayout({ children }: Props): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

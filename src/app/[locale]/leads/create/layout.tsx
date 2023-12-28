import { ProtectedRoute } from 'components/custom';

export const metadata = {
  title: 'Create lead',
};

type Props = {
  children: React.ReactNode;
};

export default function CreateLeadLayout({ children }: Props): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
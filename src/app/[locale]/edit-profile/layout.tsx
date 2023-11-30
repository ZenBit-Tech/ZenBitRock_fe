import { ProtectedRoute } from 'components/custom';

type Props = {
  children: React.ReactNode;
};

export default function EditProfileLayout({ children }: Props): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

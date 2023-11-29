import { PublicRoute } from 'components/custom';
import { ProtectedRoute } from 'components/custom';
import ReduxProvider from 'store/ReduxProvider';

type Props = {
  children: React.ReactNode;
};

export default function EditProfileLayout({ children }: Props): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

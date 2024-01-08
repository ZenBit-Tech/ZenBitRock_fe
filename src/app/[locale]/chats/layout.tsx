import { ProtectedRoute } from 'components/custom';

export const metadata = {
  title: 'Chats',
};

type Props = {
  children: React.ReactNode;
};

export default function MessagesLayout({ children }: Props): JSX.Element {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

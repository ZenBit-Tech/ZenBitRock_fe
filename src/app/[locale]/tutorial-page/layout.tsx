import { ProtectedRoute } from 'components/custom';

type Props = {
  children: React.ReactNode;
};

export default function TutorialLayout({ children }: Props): JSX.Element {
  return <>{children}</>;
}

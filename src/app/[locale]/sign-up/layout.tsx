import { PublicRoute } from 'components/custom';

type Props = {
  children: React.ReactNode;
};

export default function SignUpLayout({ children }: Props): JSX.Element {
  return <PublicRoute>{children}</PublicRoute>;
}

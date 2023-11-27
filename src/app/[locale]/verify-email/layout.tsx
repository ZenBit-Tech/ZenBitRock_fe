import { CompactLayout } from './components';

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: 'Verify Email',
};

export default function Layout({ children }: Props) {
  return <CompactLayout>{children}</CompactLayout>;
}

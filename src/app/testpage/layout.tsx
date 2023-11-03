'use client';

import TestHeader from './components/Header';
import { Props } from './types';

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <>
      <TestHeader />
      {children}
    </>
  );
}

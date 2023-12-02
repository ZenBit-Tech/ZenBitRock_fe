'use client';

import { RootState } from 'store';
import { useSelector } from 'hooks';
import { Navbar, ProtectedRoute } from 'components/custom';
import PropertiesList from 'components/PropertiesList';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <PropertiesList />
    </>
  );
}

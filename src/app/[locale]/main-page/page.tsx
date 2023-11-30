'use client';

<<<<<<< HEAD
import { RootState } from 'store';
import { useSelector } from 'hooks';
import { ProtectedRoute } from 'components/custom';
import PropertiesList from 'components/PropertiesList';
=======
import { Navbar, ProtectedRoute } from 'components/custom';
>>>>>>> a79fa93b8f9c7bac1e29458f4a0e06bc30758ec8

export default function MainPage() {
  return (
    <ProtectedRoute>
<<<<<<< HEAD
      <p>{auth.email}</p>
      <PropertiesList />
=======
      <Navbar />
>>>>>>> a79fa93b8f9c7bac1e29458f4a0e06bc30758ec8
    </ProtectedRoute>
  );
}

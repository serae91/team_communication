import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth/AuthProvider.tsx';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Lade...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

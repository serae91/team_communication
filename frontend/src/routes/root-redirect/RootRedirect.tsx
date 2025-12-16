import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/auth/AuthProvider.tsx';

export const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/mainpage" replace /> : <Navigate to="/login" replace />;
};

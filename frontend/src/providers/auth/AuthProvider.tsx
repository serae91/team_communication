import React, {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';
import type { BLUserDto } from '../../dtos/BLUserDto.ts';

type AuthContextType = {
  user: BLUserDto | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<BLUserDto | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [user, setUser] = useState<BLUserDto | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await fetch('http://localhost:8080/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      localStorage.removeItem('authToken');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetch('http://localhost:8080/auth/me', {credentials: 'include'})
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${ res.status }`);
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => {
        console.error('Failed to load user info:', err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <AuthContext.Provider value={ {user, loading, setUser, logout} }>
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
};

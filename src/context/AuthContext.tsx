import { AUTH_INITIAL_STATE, INITIAL_USER } from '@/constants';
import { getCurrentUser } from '@/lib/firebase';
import { auth } from '@/lib/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser>(INITIAL_USER);

  const checkUserAuth = async () => {
    setIsLoading(true);
    try {
      await onAuthStateChanged(auth, user => {
        if (user) {
          console.log(getCurrentUser(user.uid));

          setIsAuthenticated(true);
          return true;
        }
      });

      return false;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback');
    if (!cookieFallback) {
      navigate('/sign_in');
    }

    checkUserAuth();
  }, []);

  const providerValue = {
    isAuthenticated,
    isLoading,
    user,
    setIsAuthenticated,
    setUser,
    checkUserAuth,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthContext = createContext<IAuthContext>(AUTH_INITIAL_STATE);
export const useUserContext = () => useContext(AuthContext);

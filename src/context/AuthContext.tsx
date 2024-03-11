import { AUTH_INITIAL_STATE, INITIAL_USER } from '@/constants';
import { auth } from '@/lib/firebase/config';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>(INITIAL_USER);

  const checkUserAuth = async () => {
    if (auth.currentUser) {
      localStorage.setItem('userAuth', auth.currentUser.uid);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem('userAuth');
    if (!cookieFallback) {
      setIsAuthenticated(false);
      navigate('/sign_in');
    }

    checkUserAuth();
  }, []);

  const providerValue = {
    isAuthenticated,
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

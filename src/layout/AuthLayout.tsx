import { useUserContext } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>{isAuthenticated ? <Navigate to='/' /> : <Navigate to='/sign_in' />}</>
  );
};

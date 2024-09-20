import React, {useEffect, useState} from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import {authStore} from '../database/Store';

const Routes = () => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    console.log('Add listener');
    const listener = authStore.addOnValueChangedListener(key => {
      if (key === 'token') {
        setToken(authStore.getString('token'));
      }
    });

    return () => {
      console.log('Remove listener');
      listener.remove();
    };
  }, []);

  return <>{token ? <PrivateRoutes /> : <PublicRoutes />}</>;
};

export default Routes;

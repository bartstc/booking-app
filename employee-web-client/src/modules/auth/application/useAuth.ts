import { useEffect, useState } from 'react';

import { useRequestStatus } from 'hooks';
import { RequestStatus } from 'types';

import { authService } from './AuthService';
import { IUser } from './types/IUser';

export const useAuth = () => {
  const [status, setStatus] = useRequestStatus();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!user && status !== RequestStatus.Init) return;

      try {
        const result = await authService.getUser();

        if (result === null) {
          throw new Error('User not found');
        }

        setStatus(RequestStatus.Done);
        setUser(result);
      } catch {
        setStatus(RequestStatus.Failure);
        setUser(null);
      }
    };

    getUser();
  }, [setStatus, setUser]);

  return {
    isLoading: status === RequestStatus.InProgress,
    isAuthenticated: user !== null,
    user,
    login: () => authService.login(),
    logout: () => authService.logout(),
    renewToken: () => authService.renewToken(),
    getUser: () => authService.getUser(),
  };
};

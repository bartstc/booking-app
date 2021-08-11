import React, { ReactNode } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import { IUser } from './types/IUser';

type AuthContext = {
  signinRedirectCallback: () => Promise<void>;
  getUser: () => Promise<IUser | null>;
  parseJwt: (token: string) => string;
  login: () => void;
  isAuthenticated: () => boolean;
  signinSilent: () => void;
  signinSilentCallback: () => void;
  createSigninRequest: () => void;
  logout: () => void;
  signoutRedirectCallback: () => void;
};

const context = createContext<Partial<AuthContext>>({});

interface IProviderProps {
  children: ReactNode;
  value: AuthContext;
}

export const AuthProvider = ({ value, children }: IProviderProps) => {
  return <context.Provider value={value}>{children}</context.Provider>;
};

type Selector<Selected> = (state: AuthContext) => Selected;

export function useAuthContextSelector<Selected>(selector: Selector<Selected> = state => (state as unknown) as Selected) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useContextSelector<AuthContext, Selected>(context as any, selector)
  );
}

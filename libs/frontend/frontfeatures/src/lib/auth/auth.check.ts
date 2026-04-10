import { createContext, useContext } from 'react';
import { User } from '@org/features';

type UserContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  registerUser: (email: string, username: string, password: string) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: () => boolean;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const useAuth = () => useContext(UserContext);

export const useAuthCheck = () => {
  const { token, loading } = useAuth();

  return {
    isLoggedIn: !!token,
    loading,
  };
};

export const useLoggedInUser = () => {
  const { user } = useAuth();
  return user;
};
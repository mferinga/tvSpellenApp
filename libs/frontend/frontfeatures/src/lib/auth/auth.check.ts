import { User } from '@org/features';
import React from 'react'
import { createContext } from "react";

type UserContextType = {
  user: User | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const authCheck = () => {
    return {
        isLoggedIn: () => true
    };
}//React.useContext(UserContext);
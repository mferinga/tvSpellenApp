import React, { useEffect, useState } from 'react';
import { User } from '@org/features';
import { UserContext } from '../auth/auth.check';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const res = await fetch('http://localhost:3333/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        setUser(null);
        setToken(null);
        return;
      }

      const data = await res.json();

      // supports both:
      // return req.user
      // return { user: req.user }
      const currentUser = data?.user ?? data ?? null;

      setUser(currentUser);
      setToken('authenticated');
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await checkLogin();
      setLoading(false);
    };

    init();
  }, []);

  const loginUser = async (email: string, password: string) => {
    const res = await fetch('http://localhost:3333/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email,
        wachtwoord: password,
        }),
    });

    if (!res.ok) {
        throw new Error('Login failed');
    }

    await checkLogin();
  };

  const registerUser = async (email: string, username: string, password: string) => {
    const res = await fetch('http://localhost:3333/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (!res.ok) {
      throw new Error('Register failed');
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3333/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        registerUser,
        loginUser,
        logout,
        isLoggedIn: () => !!token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
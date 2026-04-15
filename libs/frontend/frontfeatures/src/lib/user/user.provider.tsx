import React, { useEffect, useState } from 'react';
import { User } from '@org/features';
import { UserContext } from '../auth/auth.check';
import { SPELDATA_API_BASE_URL } from '../api-config';

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkLogin = async () => {
    try {
      const res = await fetch(`${SPELDATA_API_BASE_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        setUser(null);
        setToken(null);
        return;
      }

      const data = await res.json();

      const rawUser = data?.user ?? data?.results ?? data ?? null;

      const normalizedUser = rawUser
        ? {
            ...rawUser,
            _id: rawUser._id ?? rawUser.id ?? rawUser.userId ?? '',
          }
        : null;

      setUser(normalizedUser);
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
    const res = await fetch(`${SPELDATA_API_BASE_URL}/auth/login`, {
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
    const res = await fetch(`${SPELDATA_API_BASE_URL}/auth/register`, {
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
      await fetch(`${SPELDATA_API_BASE_URL}/auth/logout`, {
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

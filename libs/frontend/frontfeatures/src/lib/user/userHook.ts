import { useEffect, useState } from 'react';
import { IUser } from '@org/data-api';
import { SPELDATA_API_BASE_URL } from '../api-config';

export function useGetAllUsers() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${SPELDATA_API_BASE_URL}/users`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await res.json();

        setUsers(Array.isArray(data.results) ? data.results : data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}

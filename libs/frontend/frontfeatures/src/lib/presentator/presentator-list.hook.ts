import { useEffect, useState } from 'react';
import { SPELDATA_API_BASE_URL } from '../api-config';

export type IPresentator = {
  _id: string;
  naam: string;
  geboortedatum?: string;
  bio?: string;
};

export function useGetAllPresentators() {
  const [presentators, setPresentators] = useState<IPresentator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPresentators = async () => {
      try {
        const response = await fetch(`${SPELDATA_API_BASE_URL}/presentator`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch presentators');
        }

        const data = await response.json();
        const results = data?.results ?? data ?? [];
        setPresentators(results);
      } catch (error) {
        console.error(error);
        setError('Could not load presentators');
      } finally {
        setLoading(false);
      }
    };

    fetchPresentators();
  }, []);

  return { presentators, loading, error };
}

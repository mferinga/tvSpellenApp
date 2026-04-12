import { useEffect, useState } from 'react';

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
        const response = await fetch('http://localhost:3333/api/presentator', {
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
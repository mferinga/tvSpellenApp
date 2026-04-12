import { useEffect, useState } from 'react';

export type ISpellijst = {
  _id: string;
  naam: string;
  beschrijving: string;
  spelleider?: string;
  spelerIds?: string[];
  spelIds?: string[];
};

export function useGetAllSpellijsten() {
  const [spellijsten, setSpellijsten] = useState<ISpellijst[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpellijsten = async () => {
      try {
        setLoading(true);

        const response = await fetch('http://localhost:3333/api/spellijsten', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch spellijsten');
        }

        const data = await response.json();

        const results = data?.results ?? data ?? [];
        setSpellijsten(results);
      } catch (err) {
        console.error(err);
        setError('Kon spellijsten niet ophalen');
      } finally {
        setLoading(false);
      }
    };

    fetchSpellijsten();
  }, []);

  return { spellijsten, loading, error };
}
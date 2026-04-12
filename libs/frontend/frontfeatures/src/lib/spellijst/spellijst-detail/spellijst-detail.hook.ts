import { useEffect, useState } from 'react';

type ISpel = {
  _id: string;
  naam: string;
  beschrijving: string;
};

type IUser = {
  _id: string;
  naam: string;
  email?: string;
};

type ISpellijstDetail = {
  _id: string;
  naam: string;
  beschrijving: string;
  spellen: ISpel[];
  spelers: IUser[];
  spelleider?: IUser;
};

export function useGetSpellijstDetail(id: string) {
  const [spellijst, setSpellijst] = useState<ISpellijstDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpellijst = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:3333/api/spellijsten/${id}`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch spellijst detail');
        }

        const data = await response.json();
        const result = data?.results ?? data ?? null;

        setSpellijst(result);
      } catch (err) {
        console.error(err);
        setError('Kon spellijst niet ophalen');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpellijst();
    }
  }, [id]);

  return { spellijst, loading, error };
}
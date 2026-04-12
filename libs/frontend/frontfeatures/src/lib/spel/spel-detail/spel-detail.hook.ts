import { useEffect, useState } from 'react';

type ISpel = {
  _id: string;
  naam: string;
  beschrijving: string;
  uitleg: string;
  orgineleNaam?: string;
  teams?: boolean;
  teamGrootte?: number;
};

export function useGetSpelDetail(id: string) {
  const [spel, setSpel] = useState<ISpel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpel = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/spel/${id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch spel');
        }

        const data = await response.json();
        console.log('spel detail data:', data);

        const rawSpel = data?.results ?? data ?? null;

        const normalizedSpel = rawSpel
          ? {
              ...rawSpel,
              _id: rawSpel._id ?? '',
              naam: rawSpel.naam ?? '',
              beschrijving: rawSpel.beschrijving ?? '',
              uitleg: rawSpel.uitleg ?? '',
              orgineleNaam: rawSpel.orgineleNaam ?? '',
              teams: rawSpel.teams ?? false,
              teamGrootte: rawSpel.teamGrootte ?? undefined,
            }
          : null;

        setSpel(normalizedSpel);
      } catch (error) {
        console.error(error);
        setError('Could not load spel');
      } finally {
        setLoading(false);
      }
    };

    fetchSpel();
  }, [id]);

  return { spel, loading, error };
}
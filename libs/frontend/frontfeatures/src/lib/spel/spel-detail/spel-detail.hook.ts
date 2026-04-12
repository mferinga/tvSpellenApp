import { useEffect, useState } from 'react';

type IPresentator = {
  _id: string;
  naam: string;
  geboortedatum?: string;
  bio?: string;
};

type ISpel = {
  _id: string;
  naam: string;
  beschrijving: string;
  uitleg: string;
  originleNaam?: string;
  teams?: boolean;
  teamgrootte?: number;
  presentators?: IPresentator[];
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
        const rawSpel = data?.results ?? data ?? null;

        const normalizedSpel = rawSpel
          ? {
              ...rawSpel,
              _id: rawSpel._id ?? '',
              naam: rawSpel.naam ?? '',
              beschrijving: rawSpel.beschrijving ?? '',
              uitleg: rawSpel.uitleg ?? '',
              originleNaam: rawSpel.originleNaam ?? '',
              teams: rawSpel.teams ?? false,
              teamgrootte: rawSpel.teamgrootte ?? undefined,
              presentators: rawSpel.presentators ?? [],
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
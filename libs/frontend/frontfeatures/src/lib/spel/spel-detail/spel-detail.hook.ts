import { useEffect, useState } from 'react';
import { ISpel } from '@org/data-api';
import { SpelService } from '../../spel.service';

export function useGetSpelDetail(id: string) {
  const [spel, setSpel] = useState<ISpel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    SpelService.getBySpellenId(id)
      .then((res) => {
        setSpel(Array.isArray(res.results) ? res.results[0] : res.results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { spel, loading, error };
}

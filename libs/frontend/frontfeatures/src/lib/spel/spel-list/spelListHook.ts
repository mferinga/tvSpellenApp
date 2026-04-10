import { useEffect, useState } from 'react';
import { ISpel } from '@org/data-api';
import { SpelService } from '../../spel.service';

export function useGetAllSpellen() {
  const [spellen, setAllSpellen] = useState<ISpel[]>([]);
  const [loadingSpellen, setLoading] = useState(true);
  const [spellenError, setError] = useState<string | null>(null);

  useEffect(() => {
    SpelService.getAllSpellen()
      .then((res) => {
        setAllSpellen(Array.isArray(res.results) ? res.results : [res.results]);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { spellen, loadingSpellen, spellenError };
}

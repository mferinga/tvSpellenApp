import { useEffect, useState } from 'react';
import { RECOM_API_BASE_URL } from '../api-config';

type RecommendedSpel = {
  mongoId: string;
  naam: string;
  teams?: boolean;
  teamgrootte?: number;
  overlapCount: number;
  supportCount: number;
  score: number;
};

export function useGetSpellijstRecommendations(
  spellijstId: string,
  limit = 6
) {
  const [recommendations, setRecommendations] = useState<RecommendedSpel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(
          `${RECOM_API_BASE_URL}/recommendations/spellijsten/${spellijstId}?limit=${limit}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setError('Could not load recommendations');
      } finally {
        setLoading(false);
      }
    };

    if (spellijstId) {
      fetchRecommendations();
    }
  }, [spellijstId, limit]);

  return { recommendations, loading, error };
}

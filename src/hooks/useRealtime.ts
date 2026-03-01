// src/hooks/useRealtime.ts
import { useEffect, useState } from 'react';

export function useRealtime<T>(
  initialData: T,
  fetchFn: () => Promise<T>,
  interval = 30000 // 30 seconds
) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newData = await fetchFn();
        setData(newData);
      } catch (error) {
        console.error('Error fetching real-time data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval
    const intervalId = setInterval(fetchData, interval);

    return () => clearInterval(intervalId);
  }, [fetchFn, interval]);

  return { data, loading };
}
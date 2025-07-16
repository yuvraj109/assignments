import { useState, useEffect, useCallback } from 'react';

interface UseFetchResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchMore: () => void;
  reset: () => void;
}

interface ApiResponse {
  records: any[];
  total: number;
  count: number;
  offset: string;
  limit: string;
  status: string;
}

const useFetch = <T,>(
  baseUrl: string,
  apiKey: string,
  limit: number = 10
): UseFetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchData = useCallback(async (currentOffset: number, reset: boolean = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);

    try {
      const url = `${baseUrl}?api-key=${apiKey}&format=json&offset=${currentOffset}&limit=${limit}`;
      console.log('Fetching:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiResponse = await response.json();
      console.log('API Response:', result);
      
      if (result.status !== 'ok') {
        throw new Error('API returned error status');
      }
      
      const records = result.records || [];
      
      if (reset) {
        setData(records);
      } else {
        setData(prev => [...prev, ...records]);
      }
      

      const recordsLength = records.length;
      setHasMore(recordsLength === limit && currentOffset + recordsLength < (result.total || 0));
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  }, [baseUrl, apiKey, limit]);

  const fetchMore = useCallback(() => {
    if (!loading && hasMore) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchData(newOffset);
    }
  }, [offset, limit, loading, hasMore, fetchData]);

  const reset = useCallback(() => {
    setData([]);
    setOffset(0);
    setError(null);
    setHasMore(true);
    setIsInitialized(false);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      fetchData(0, true);
    }
  }, [isInitialized, fetchData]);

  return {
    data,
    loading,
    error,
    hasMore,
    fetchMore,
    reset
  };
};

export default useFetch;

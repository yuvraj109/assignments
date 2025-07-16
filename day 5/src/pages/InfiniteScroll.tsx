import { useEffect, useRef, useCallback } from 'react';
import useFetch from '../hooks/useFetch';

interface CommodityRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

const InfiniteScroll = () => {
  const API_BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
  const API_KEY = import.meta.env.VITE_GOV_API_KEY;
  

 
  const { data, loading, error, hasMore, fetchMore } = useFetch<CommodityRecord>(API_BASE_URL, API_KEY, 10);
  const observerRef = useRef<IntersectionObserver | null>(null);

//   console.log('Component state:', { dataLength: data.length, loading, error, hasMore });

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Intersection detected, fetching more...');
        fetchMore();
      }
    }, {
      threshold: 0.1
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, fetchMore]);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="infinite-scroll-container p-4">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error Loading Data</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="infinite-scroll-container p-4 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Daily Mandi Prices</h2>
        <p className="text-gray-600">Current Daily Price of Various Commodities from Various Markets</p>
        <div className="mt-2 text-sm text-gray-500">
          Showing {data.length} items {hasMore && '(Loading more as you scroll...)'}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((record, index) => {
          const isLast = index === data.length - 1;
          return (
            <div
              key={`${record.state}-${record.district}-${record.market}-${record.commodity}-${index}`}
              ref={isLast ? lastElementRef : null}
              className="border border-gray-200 rounded p-4 hover:border-gray-300"
            >
      
              <div className="mb-3">
                <h3 className="font-bold text-lg">{record.commodity}</h3>
                <p className="text-sm text-gray-600">{record.variety} - {record.grade}</p>
              </div>
              
         
              <div className="mb-3 text-sm">
                <div>Market: {record.market}</div>
                <div>District: {record.district}</div>
                <div>State: {record.state}</div>
                <div>Date: {record.arrival_date}</div>
              </div>
              
       
              <div className="border-t pt-3 space-y-1">
                <div className="flex justify-between">
                  <span>Min Price:</span>
                  <span>₹{parseInt(record.min_price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Price:</span>
                  <span>₹{parseInt(record.max_price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Modal Price:</span>
                  <span>₹{parseInt(record.modal_price).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2">Loading more...</p>
        </div>
      )}


      {!hasMore && data.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No more data to load</p>
          <p className="text-sm text-gray-500">Total items: {data.length}</p>
        </div>
      )}


      {data.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600">No data available</p>
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;
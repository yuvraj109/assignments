import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks';

export function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchCount, setSearchCount] = useState(0);

  useEffect(() => {
    if (debouncedSearchTerm) {

        // console.log(`Searching for: ${debouncedSearchTerm}`);
      setSearchCount(prev => prev + 1);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="demo-card">
      <h3>useDebounce Hook</h3>
      <p>Debounce value changes (500ms delay)</p>
      
      <div className="input-group">
        <label>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
        />
      </div>
      
      <div className="output">
        <div>Input: "{searchTerm}"</div>
        <div>Debounced: "{debouncedSearchTerm}"</div>
        <div>Search count: {searchCount}</div>
      </div>
    </div>
  );
}

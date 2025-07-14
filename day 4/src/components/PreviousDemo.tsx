import { useState } from 'react';
import { usePrevious } from '../hooks';

export function PreviousDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const previousCount = usePrevious(count);
  const previousName = usePrevious(name);

  return (
    <div className="demo-card">
      <h3>usePrevious Hook</h3>
      <p>Track previous value of any state</p>
      
      <div className="input-group">
        <label>Counter:</label>
        <div className="button-group">
          <button onClick={() => setCount(count + 1)}>+1</button>
          <button onClick={() => setCount(count - 1)}>-1</button>
        </div>
      </div>
      
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type something..."
        />
      </div>
      
      <div className="output">
        <div>Count: {count} (Previous: {previousCount ? previousCount: 'undefined'})</div>
        <div>Name: "{name}" (Previous: "{previousName ? previousName  : 'undefined'}")</div>
      </div>
    </div>
  );
}

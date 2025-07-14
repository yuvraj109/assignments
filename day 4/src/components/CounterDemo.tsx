import { useState } from 'react';
import { useCounter } from '../hooks';

export function CounterDemo() {
  const { count, increment, decrement, reset, setValue } = useCounter(0);
  const [customValue, setCustomValue] = useState('');

  return (
    <div className="demo-card">
      <h3>useCounter Hook</h3>
      <p>Counter with increment/decrement/reset</p>
      
      <div className="button-group">
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
      
      <div className="input-group">
        <label>Set custom value:</label>
        <input
          type="number"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          placeholder="Enter number"
        />
        <button onClick={() => setValue(Number(customValue) || 0)}>
          Set
        </button>
      </div>
      
      <div className="output">
        Count: {count}
      </div>
    </div>
  );
}

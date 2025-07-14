import { useState, useCallback } from 'react';

interface CounterActions {

  count: number;
  increment:  () => void;
  decrement: () => void;
  reset: ()=> void;
  setValue: (value: number)=> void;
}

export function useCounter(initialValue: number = 0): CounterActions {
  const [count, setCount] = useState<number>(initialValue);

  const increment = useCallback(() => setCount(prev => prev + 1), []);
  const decrement = useCallback(() => setCount(prev => prev - 1), []);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  const setValue = useCallback((value: number) => setCount(value), []);

  return { count,
     increment, 
     decrement, 
     reset, 
     setValue };

}

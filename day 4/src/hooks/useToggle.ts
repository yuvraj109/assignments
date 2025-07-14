import { useState, useCallback } from 'react';

interface ToggleActions {
  value: boolean;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  
  setValue: (value: boolean) => void;
}

export function useToggle(initialValue: boolean = false): ToggleActions {

    const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(  () => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
}

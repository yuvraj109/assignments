
import { useEffect } from 'react';

export function useFormDraft(key, values, setValue) {
 
  useEffect(() => {
    const draft = localStorage.getItem(key);
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        Object.entries(parsed).forEach(([k, v]) => setValue(k, v));
      } catch {}
    }

  }, [key, setValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(values));
  }, [key, values]);
}

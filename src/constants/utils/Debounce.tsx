import {useState, useEffect, useCallback} from 'react';
 
export const debounceQuery = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
 
  useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
 
    // Cleanup function to clear the timeout if value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
 
  // ✅ reset function
  const reset = useCallback(() => {
    setDebouncedValue('');
  }, []);
 
  return [debouncedValue, reset] as const;
};
import { useEffect, useRef } from 'react';

const useCompare = (val: string | boolean | number) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

const usePrevious = (val: string | boolean | number) => {
  const ref = useRef<string | boolean | number>();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
};

export default useCompare;

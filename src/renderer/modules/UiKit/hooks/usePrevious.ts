import { useEffect, useRef } from 'react';

const usePrevious = (val: string | boolean | number) => {
  const ref = useRef<string | boolean | number>();
  useEffect(() => {
    ref.current = val;
  });
  return ref.current;
};

export default usePrevious;

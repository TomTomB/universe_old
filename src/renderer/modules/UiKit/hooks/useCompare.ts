import usePrevious from './usePrevious';

const useCompare = (val: string | boolean | number) => {
  const prevVal = usePrevious(val);
  return prevVal !== val;
};

export default useCompare;

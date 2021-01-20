import { useEffect } from 'react';

const useClickOutside = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.MutableRefObject<any>,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;

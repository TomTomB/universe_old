import { useEffect } from 'react';

const useClickOutside = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: React.MutableRefObject<any>,
  callback: () => void,
  respectDefaultPrevented?: boolean
) => {
  const handleClick = (e: MouseEvent) => {
    if (respectDefaultPrevented) {
      if (!e.defaultPrevented && !ref.current?.contains(e.target)) {
        callback();
      }
    } else {
      if (!ref.current?.contains(e.target)) {
        callback();
      }
    }
  };

  useEffect(() => {
    const root = document.getElementById('root');

    if (!root) {
      return;
    }

    root.addEventListener('click', handleClick);

    return () => {
      root.removeEventListener('click', handleClick);
    };
  });
};

export default useClickOutside;

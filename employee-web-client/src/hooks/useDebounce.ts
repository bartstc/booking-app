// https://github.com/streamich/react-use/blob/master/docs/useDebounce.md
import { useEffect } from 'react';

export const useDebounce = (fn: Function, ms = 0, args: unknown[] = []) => {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      // if args change then clear timeout
      clearTimeout(handle);
    };
  }, args);
};

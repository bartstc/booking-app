/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

import { useDebounce } from 'hooks';

import { useQueryParams } from '../Params';

export const useFilterInput = (filterName: string, delay = 300) => {
  const { params, change, resetPagination, remove } = useQueryParams();
  const param = (params as any)[filterName] ?? '';

  const [state, setState] = useState(param);
  const currentState = useRef(state);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (param !== currentState.current) {
      currentState.current = param;
      setState(param);
    }
  }, [param]);

  useEffect(() => {
    if (!state) {
      setState('');
      remove(filterName);
    }
  }, [state]);

  useDebounce(
    () => {
      if (!didMountRef.current) {
        didMountRef.current = true;
        return;
      }

      if (!state) {
        return;
      }

      change(filterName, state);
      resetPagination(filterName);
    },
    delay,
    [state],
  );

  const onChange = (value: string) => {
    currentState.current = value;
    setState(value);
  };

  return {
    onChange,
    value: state,
  };
};

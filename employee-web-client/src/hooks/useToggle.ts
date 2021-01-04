// https://github.com/streamich/react-use/blob/master/docs/useToggle.md

import { useCallback, useState } from 'react';

const useToggle = (initialValue?: boolean): [boolean, (nextValue?: unknown) => void] => {
  const [value, setValue] = useState(initialValue ?? false);

  const toggle = useCallback(
    (nextValue?: unknown) => {
      if (typeof nextValue === 'boolean') {
        setValue(nextValue);
      } else {
        setValue(currentValue => !currentValue);
      }
    },
    [setValue],
  );

  return [value, toggle];
};

export { useToggle };

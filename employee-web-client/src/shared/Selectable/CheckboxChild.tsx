import React from 'react';
import { Checkbox, CheckboxProps, chakra } from '@chakra-ui/react';

import { useCheckboxStore } from './CheckboxParent';

const CheckboxChild = (props: CheckboxProps) => {
  const { add, remove, includes } = useCheckboxStore(store => ({
    add: store.add,
    remove: store.remove,
    includes: store.includes,
  }));

  return (
    <chakra.div p='3px'>
      <Checkbox
        colorScheme='primary'
        {...props}
        isChecked={includes(props.value as string)}
        onChange={e => {
          e.target.checked ? add(e.target.value) : remove(e.target.value);
        }}
      />
    </chakra.div>
  );
};

export { CheckboxChild };

import React from 'react';
import { Checkbox, CheckboxProps, chakra } from '@chakra-ui/react';

import { useCollectionStoreContextSelector } from './CollectionProvider';

const CheckboxChild = (props: CheckboxProps) => {
  const includes = useCollectionStoreContextSelector(store => store.includes);
  const add = useCollectionStoreContextSelector(store => store.add);
  const remove = useCollectionStoreContextSelector(store => store.remove);

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

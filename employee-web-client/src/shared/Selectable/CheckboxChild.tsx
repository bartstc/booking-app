import React from 'react';
import { Checkbox, CheckboxProps, chakra, useColorModeValue, useTheme } from '@chakra-ui/react';

import { useCollectionStoreContextSelector } from './CollectionProvider';

interface IProps extends CheckboxProps {
  label: string;
}

const CheckboxChild = ({ label, ...props }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[800]);

  const includes = useCollectionStoreContextSelector(store => store.includes);
  const add = useCollectionStoreContextSelector(store => store.add);
  const remove = useCollectionStoreContextSelector(store => store.remove);

  return (
    <chakra.div p='3px'>
      <Checkbox
        colorScheme='primary'
        outline={`1px solid ${borderColor}`}
        aria-label={`${label}-table-checkbox-child`}
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

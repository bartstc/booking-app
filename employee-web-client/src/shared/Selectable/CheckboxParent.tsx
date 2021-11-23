import React, { ChangeEvent } from 'react';
import { Checkbox, CheckboxProps, chakra, useTheme, useColorModeValue } from '@chakra-ui/react';
import intersection from 'lodash/intersection';

import { useCollectionStoreContextSelector } from './CollectionProvider';

interface IProps extends CheckboxProps {
  items: string[];
}

const CheckboxParent = (props: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[800]);

  const { items: available } = props;
  const checked = useCollectionStoreContextSelector(store => store.items);
  const add = useCollectionStoreContextSelector(store => store.add);
  const remove = useCollectionStoreContextSelector(store => store.remove);

  const allChecked = intersection(checked, available).length === available.length;
  const isIndeterminate = intersection(checked, available).length > 0 && !allChecked;

  const toggleAvailable = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.checked ? add(available) : remove(available);
  };

  return (
    <chakra.div p='3px' ml='4px'>
      <Checkbox
        outline={`1px solid ${borderColor}`}
        colorScheme='primary'
        {...props}
        isChecked={allChecked}
        isIndeterminate={isIndeterminate}
        onChange={toggleAvailable}
      />
    </chakra.div>
  );
};

export { CheckboxParent };

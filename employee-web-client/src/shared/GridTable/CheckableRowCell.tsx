import React from 'react';
import { FlexProps } from '@chakra-ui/react';

import { CheckboxChild } from '../Selectable';
import { RowCell } from './RowCell';

interface IProps extends FlexProps {
  value: string;
}

const CheckableRowCell = ({ value, ...props }: IProps) => {
  // const { colors } = useTheme();

  // const includes = useCollectionStoreContextSelector(store => store?.includes);
  // const isSelected = includes ? includes(value) : false;

  return (
    <RowCell {...props}>
      <CheckboxChild value={value} />
    </RowCell>
  );
};

export { CheckableRowCell };

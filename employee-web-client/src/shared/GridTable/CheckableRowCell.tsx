import React from 'react';
import { FlexProps } from '@chakra-ui/react';

import { CheckboxChild } from '../Selectable';
import { RowCell } from './RowCell';

interface IProps extends FlexProps {
  value: string;
  name: string;
  label: string;
}

const CheckableRowCell = ({ value, label, ...props }: IProps) => {
  // const { colors } = useTheme();

  // const includes = useCollectionStoreContextSelector(store => store?.includes);
  // const isSelected = includes ? includes(value) : false;

  return (
    <RowCell {...props}>
      <CheckboxChild label={label} value={value} />
    </RowCell>
  );
};

export { CheckableRowCell };

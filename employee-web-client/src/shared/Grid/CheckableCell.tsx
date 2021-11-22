import React from 'react';
import { FlexProps } from '@chakra-ui/react';

import { CheckboxChild } from '../Selectable';
import { TruncatedCell } from './TruncatedCell';

interface IProps extends FlexProps {
  value: string;
}

const CheckableCell = ({ value, ...props }: IProps) => {
  // const { colors } = useTheme();

  // const includes = useCollectionStoreContextSelector(store => store?.includes);
  // const isSelected = includes ? includes(value) : false;

  return (
    <TruncatedCell {...props}>
      <CheckboxChild value={value} />
    </TruncatedCell>
  );
};

export { CheckableCell };

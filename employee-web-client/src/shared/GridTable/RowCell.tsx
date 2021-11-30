import React, { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';

import { PrimaryText } from './PrimaryText';
import { useTableContextSelector } from './TableProvider';

export interface IRowCellProps extends FlexProps {
  children: ReactNode | string;
  name: string;
  isNumeric?: boolean;
  isBold?: boolean;
}

const RowCell = ({ children, isNumeric = false, name, isBold = false, ...props }: IRowCellProps) => {
  const display = useTableContextSelector(state => state.config[name].display);
  const isVisible = useTableContextSelector(state => state.config[name].isVisible);

  return (
    <Flex
      borderLeft='3px solid transparent'
      className='cell'
      justify={isNumeric ? 'flex-end' : 'flex-start'}
      pr={isNumeric ? '1.5rem' : '0.5rem'}
      {...props}
      display={isVisible ? display ?? { sm: 'flex' } : 'none'}
    >
      <PrimaryText isBold={isBold}>{children}</PrimaryText>
    </Flex>
  );
};

export { RowCell };

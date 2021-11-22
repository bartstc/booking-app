import React, { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { PrimaryText } from './PrimaryText';

export interface ITruncatedCellProps extends FlexProps {
  children: ReactNode | string;
  isNumeric?: boolean;
  isBold?: boolean;
}

const TruncatedCell = ({ children, isNumeric = false, isBold = false, ...props }: ITruncatedCellProps) => {
  return (
    <Flex
      borderLeft='3px solid transparent'
      className='cell'
      justify={isNumeric ? 'flex-end' : 'flex-start'}
      pr={isNumeric ? '1.5rem' : '0.5rem'}
      {...props}
    >
      <PrimaryText isBold={isBold}>{children}</PrimaryText>
    </Flex>
  );
};

export { TruncatedCell };

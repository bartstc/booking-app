import React, { ReactNode } from 'react';
import { Flex, FlexProps } from '@chakra-ui/react';
import { PrimaryText } from './PrimaryText';

interface IProps extends FlexProps {
  children: ReactNode | string;
  isNumeric?: boolean;
  isBold?: boolean;
}

const TruncatedCell = ({ children, isNumeric = false, isBold = false, ...props }: IProps) => {
  return (
    <Flex className='cell' justify={isNumeric ? 'flex-end' : 'flex-start'} pr={isNumeric ? '1.5rem' : '0.5rem'} {...props}>
      <PrimaryText isBold={isBold}>{children}</PrimaryText>
    </Flex>
  );
};

export { TruncatedCell };

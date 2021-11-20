import React, { ReactNode } from 'react';
import { mdiMenuSwap, mdiMenuUp } from '@mdi/js';
import { chakra, ChakraProps, HStack, useTheme, useColorModeValue } from '@chakra-ui/react';

import { SortingType, useSort } from 'hooks';

import { Icon } from '../Icon';

interface IProps extends ChakraProps {
  children: ReactNode;
  isNumeric?: boolean;
  name?: string;
}

interface ICell extends ChakraProps {
  children: ReactNode;
  isNumeric?: boolean;
}

interface ISortableCellProps extends ICell {
  name: string;
  children: ReactNode;
}

const SortableCell = ({ children, name, isNumeric, ...props }: ISortableCellProps) => {
  const { currentSortType, change } = useSort(name);
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  const isActive = currentSortType !== SortingType.DEFAULT;

  return (
    <HStack
      borderBottom={isActive ? `2px solid ${colors.primary[500]}` : `1px solid ${borderColor}`}
      onClick={change}
      {...props}
      cursor='pointer'
      isTruncated
      spacing={1}
      fontWeight='600'
      p='0.7rem 0.5rem'
      pr={isNumeric ? '1rem' : '0.5rem'}
      justify={isNumeric ? 'flex-end' : 'flex-start'}
    >
      <chakra.span fontSize='sm' color={textColor} isTruncated>
        {children}
      </chakra.span>
      <Icon
        path={currentSortType === SortingType.DEFAULT ? mdiMenuSwap : mdiMenuUp}
        size='24px'
        rotate={currentSortType === SortingType.ASC ? 0 : 180}
        color={isActive ? colors.primary[500] : colors.gray[400]}
      />
    </HStack>
  );
};

const Cell = ({ children, isNumeric, ...props }: ICell) => {
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <HStack
      p='0.7rem 0.5rem'
      pr={isNumeric ? '1.5rem' : '0.5rem'}
      justify={isNumeric ? 'flex-end' : 'flex-start'}
      fontWeight='600'
      borderBottom={`1px solid ${borderColor}`}
      {...props}
      isTruncated
    >
      <chakra.span fontSize='sm' color={textColor} isTruncated>
        {children}
      </chakra.span>
    </HStack>
  );
};

const HeaderCell = ({ name, isNumeric = false, ...props }: IProps) => {
  if (name) {
    return <SortableCell name={name} isNumeric={isNumeric} {...props} />;
  }

  return <Cell isNumeric={isNumeric} {...props} />;
};

export { HeaderCell };

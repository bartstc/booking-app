import React, { ReactNode } from 'react';
import { mdiMenuSwap, mdiMenuUp } from '@mdi/js';
import { chakra, ChakraProps, HStack, useTheme, useColorModeValue } from '@chakra-ui/react';

import { SortingType, useSort } from 'hooks';

import { Icon } from '../Icon';

interface IProps extends ChakraProps {
  children: ReactNode;
  name?: string;
}

interface ICell extends ChakraProps {
  children: ReactNode;
}

interface ISortableCellProps extends ChakraProps {
  name: string;
  children: ReactNode;
}

const SortableCell = ({ children, name, ...props }: ISortableCellProps) => {
  const { currentSortType, change } = useSort(name);
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.700', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[500]);

  const isActive = currentSortType !== SortingType.DEFAULT;

  return (
    <HStack
      borderBottom={isActive ? `2px solid ${colors.primary[500]}` : `1px solid ${borderColor}`}
      onClick={change}
      {...props}
      cursor='pointer'
      isTruncated
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

const Cell = ({ children, ...props }: ICell) => {
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.700', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[500]);

  return (
    <HStack borderBottom={`1px solid ${borderColor}`} {...props} isTruncated>
      <chakra.span fontSize='sm' color={textColor} isTruncated>
        {children}
      </chakra.span>
    </HStack>
  );
};

const HeaderCell = ({ name, ...props }: IProps) => {
  if (name) {
    return <SortableCell name={name} {...props} />;
  }

  return <Cell {...props} />;
};

export { HeaderCell };

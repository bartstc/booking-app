import React, { ReactNode } from 'react';
import { mdiMenuSwap, mdiMenuUp } from '@mdi/js';
import { chakra, ChakraProps, HStack, useTheme, useColorModeValue } from '@chakra-ui/react';

import { SortingType, useSort } from 'hooks';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';

interface IProps extends ChakraProps {
  children: ReactNode;
  name?: string;
  isNumeric?: boolean;
  withTooltip?: boolean;
}

interface ICellProps extends ChakraProps {
  children: ReactNode;
  isNumeric?: boolean;
  withTooltip?: boolean;
}

interface ISortableCellProps extends ICellProps {
  name: string;
  children: ReactNode;
}

const SortableCell = ({ children, name, isNumeric, withTooltip = true, ...props }: ISortableCellProps) => {
  const { currentSortType, change } = useSort(name);
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  const isActive = currentSortType !== SortingType.DEFAULT;

  return (
    <HStack
      isTruncated
      fontWeight='600'
      p='0.7rem 0.5rem'
      pr={isNumeric ? '1rem' : '0.5rem'}
      justify={isNumeric ? 'flex-end' : 'flex-start'}
      borderBottom={isActive ? `2px solid ${colors.primary[500]}` : `1px solid ${borderColor}`}
      onClick={change}
      {...props}
      cursor='pointer'
      spacing={1}
    >
      {withTooltip ? (
        <Tooltip label={children}>
          <chakra.span fontSize='sm' color={textColor} isTruncated>
            {children}
          </chakra.span>
        </Tooltip>
      ) : (
        <chakra.span fontSize='sm' color={textColor} isTruncated>
          {children}
        </chakra.span>
      )}
      <Icon
        path={currentSortType === SortingType.DEFAULT ? mdiMenuSwap : mdiMenuUp}
        size='24px'
        rotate={currentSortType === SortingType.ASC ? 0 : 180}
        color={isActive ? colors.primary[500] : colors.gray[400]}
      />
    </HStack>
  );
};

const Cell = ({ children, isNumeric, withTooltip = true, ...props }: ICellProps) => {
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <HStack
      isTruncated
      fontWeight='600'
      p='0.7rem 0.5rem'
      minH='57px'
      pr={isNumeric ? '1.5rem' : '0.5rem'}
      justify={isNumeric ? 'flex-end' : 'flex-start'}
      borderBottom={`1px solid ${borderColor}`}
      {...props}
    >
      {withTooltip ? (
        <Tooltip label={children}>
          <chakra.span fontSize='sm' color={textColor} isTruncated>
            {children}
          </chakra.span>
        </Tooltip>
      ) : (
        <chakra.span fontSize='sm' color={textColor} isTruncated>
          {children}
        </chakra.span>
      )}
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

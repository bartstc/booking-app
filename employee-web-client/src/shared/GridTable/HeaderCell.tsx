import React, { ReactNode } from 'react';
import { mdiMenuSwap, mdiMenuUp } from '@mdi/js';
import { chakra, ChakraProps, HStack, useTheme, useColorModeValue } from '@chakra-ui/react';

import { SortingType, useSort } from 'hooks';

import { Icon } from '../Icon';
import { Tooltip } from '../Tooltip';
import { useTableContextSelector } from './TableProvider';

interface IProps extends ChakraProps {
  children: ReactNode;
  name: string;
  isNumeric?: boolean;
  withTooltip?: boolean;
}

interface ICellProps extends ChakraProps {
  name: string;
  children: ReactNode;
  isNumeric?: boolean;
  withTooltip?: boolean;
}

interface ISortableCellProps extends ICellProps {}

const SortableCell = ({ children, name, isNumeric, withTooltip = true, ...props }: ISortableCellProps) => {
  const { currentSortType, change } = useSort(name);
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  const isActive = currentSortType !== SortingType.DEFAULT;

  const display = useTableContextSelector(state => state.config[name].display);
  const isVisible = useTableContextSelector(state => state.config[name].isVisible);

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
      display={isVisible ? display ?? { sm: 'flex' } : 'none'}
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

const Cell = ({ children, name, isNumeric, withTooltip = true, ...props }: ICellProps) => {
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  const display = useTableContextSelector(state => state.config[name].display);
  const isVisible = useTableContextSelector(state => state.config[name].isVisible);

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
      display={isVisible ? display ?? { sm: 'flex' } : 'none'}
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
  const isSortable = useTableContextSelector(state => state.config[name].isSortable);

  if (isSortable) {
    return <SortableCell name={name} isNumeric={isNumeric} {...props} />;
  }

  return <Cell isNumeric={isNumeric} name={name} {...props} />;
};

export { HeaderCell };

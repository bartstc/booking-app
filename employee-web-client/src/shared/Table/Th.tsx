import React from 'react';
import { chakra, HStack, Th as ChakraTh, useColorModeValue, useTheme } from '@chakra-ui/react';
import { flexRender, Header } from '@tanstack/react-table';
import { ArrowUpDownIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { camelCase } from 'lodash';

import { SortingType, useSort } from 'hooks';

interface IProps<TData> extends Header<TData, unknown> {}

function Th<TData>(header: IProps<TData>) {
  const { colors } = useTheme();
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);
  const activeBorderColor = useColorModeValue(colors.primary[500], colors.primary[500]);

  const { currentSortType, change } = useSort(camelCase(header.column.id));
  const isSortable = header.column.getCanSort();
  const isActive = currentSortType !== SortingType.DEFAULT;

  const meta = header.column.columnDef.meta;

  return (
    <ChakraTh
      p='12px 18px'
      key={header.id}
      isNumeric={meta?.isNumeric}
      borderBottom={isActive ? `1px solid ${activeBorderColor} !important` : `1px solid ${borderColor}`}
      cursor={isSortable ? 'pointer' : 'inherit'}
      onClick={isSortable ? change : undefined}
    >
      {header.column.id === 'buttons' ? null : (
        <HStack float={meta?.isNumeric ? 'right' : 'left'} color={textColor}>
          <chakra.span>{flexRender(header.column.columnDef.header, header.getContext())}</chakra.span>
          {isSortable ? (
            <>
              {currentSortType === SortingType.DESC && <TriangleDownIcon color={isActive ? colors.primary[500] : colors.gray[400]} />}
              {currentSortType === SortingType.ASC && <TriangleUpIcon color={isActive ? colors.primary[500] : colors.gray[400]} />}
              {currentSortType === SortingType.DEFAULT && <ArrowUpDownIcon />}
            </>
          ) : null}
        </HStack>
      )}
    </ChakraTh>
  );
}

export { Th };

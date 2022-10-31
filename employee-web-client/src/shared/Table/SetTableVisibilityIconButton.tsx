import React from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { VisibilityState } from '@tanstack/table-core';
import { isMobile } from 'react-device-detect';
import { useIntl } from 'react-intl';
import {
  chakra,
  Checkbox,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  VStack,
} from '@chakra-ui/react';
import { Icon } from '../Icon';
import { mdiCog } from '@mdi/js';
import { Column } from '@tanstack/react-table';

interface IProps<TData> {
  tableId: string;
  columns: Array<Column<TData>>;
}

type VisibilityStore = {
  setVisibility: (id: string) => void;
  columnVisibility: VisibilityState;
};

export const useColumnVisibilityStore = create<VisibilityStore>(set => {
  return {
    columnVisibility: {},
    setVisibility(id) {
      set(state => ({
        columnVisibility: {
          ...state.columnVisibility,
          [id]: state.columnVisibility[id] !== undefined ? !state.columnVisibility[id] : false,
        },
      }));
    },
  };
});

type VisibilityConfigStore = {
  setVisibility: (tableId: string, columnId: string) => void;
  getConfig: (tableId: string) => VisibilityState;
  config: Record<string, VisibilityState>;
};

export const useColumnVisibilityConfig = create<VisibilityConfigStore>(
  persist(
    (set, get) => {
      return {
        config: {},
        setVisibility(tableId, columnId) {
          set(state => {
            const oldValue = state.config[tableId]?.[columnId];

            return {
              config: {
                ...state.config,
                [tableId]: {
                  ...state.config[tableId],
                  [columnId]: oldValue !== undefined ? !oldValue : false,
                },
              },
            };
          });
        },
        getConfig(tableId) {
          return get().config[tableId] ?? {};
        },
      };
    },
    {
      name: 'table-visibility',
    },
  ),
);

function SetTableVisibilityIconButton<TData>({ columns, tableId }: IProps<TData>) {
  const { formatMessage } = useIntl();
  const setVisibility = useColumnVisibilityConfig(store => store.setVisibility);

  if (isMobile) {
    return null;
  }

  return (
    <Popover placement='bottom-end'>
      <PopoverTrigger>
        <IconButton
          aria-label={formatMessage({ id: 'table-configuration', defaultMessage: 'Table configuration' })}
          variant='ghost'
          icon={<Icon path={mdiCog} size='24px' />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader px={4}>
          {formatMessage({
            id: 'columns-visibility',
            defaultMessage: `Configure columns' visibility`,
          })}
        </PopoverHeader>
        <PopoverBody p={4}>
          <VStack as='ul' display='stretch' w='100%' align='flex-start'>
            {columns.map(column => {
              if (!column.getCanHide()) return null;

              return (
                <HStack as='li' spacing={3} key={column.id}>
                  <HStack spacing={1}>
                    <Checkbox isChecked={column.getIsVisible()} onChange={() => setVisibility(tableId, column.id)} />
                  </HStack>
                  <chakra.p fontWeight='500'>{column.id}</chakra.p>
                </HStack>
              );
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export { SetTableVisibilityIconButton };

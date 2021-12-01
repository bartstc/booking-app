import create from 'zustand';
import { persist } from 'zustand/middleware';

import { ITableConfig } from './ITableConfig';

type TableConfigurationStore = {
  store: Record<string, ITableConfig>;
  toggle(tableId: string, columnName: string): void;
  isColumnVisible(tableId: string, columnName: string): boolean;
  getConfig(tableId: string): ITableConfig;
};

export const tableConfigurationStore = create<TableConfigurationStore>(
  persist(
    (set, get) => {
      return {
        store: {},
        toggle(tableId, columnName) {
          set(state => ({
            store: {
              ...state.store,
              [tableId]: {
                ...state.store[tableId],
                [columnName]: {
                  ...state.store[tableId][columnName],
                  isVisible: !state.store[tableId][columnName].isVisible,
                },
              },
            },
          }));
        },
        isColumnVisible(tableId, columnName) {
          return get().store[tableId][columnName].isVisible;
        },
        getConfig(tableId: string) {
          return get().store[tableId];
        },
      };
    },
    {
      name: 'column-configurations',
    },
  ),
);

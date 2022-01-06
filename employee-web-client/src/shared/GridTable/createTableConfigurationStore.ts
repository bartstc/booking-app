import create from 'zustand';

import { ITableConfig } from './ITableConfig';

interface ITableConfigStore {
  config: ITableConfig;
  get(): void;
  toggle(columnName: string): void;
  isColumnVisible(columnName: string): boolean;
}

export function createTableConfigurationStore(initialConfig: ITableConfig) {
  return create<ITableConfigStore>((set, get) => {
    return {
      config: initialConfig,
      get() {
        return get().config;
      },
      toggle(columnName: string) {
        set(state => {
          const config = {
            ...state.config,
            [columnName]: {
              ...state.config[columnName],
              isVisible: !state.config[columnName].isVisible,
            },
          };

          return {
            config,
          };
        });
      },
      isColumnVisible(columnName: string): boolean {
        return get().config[columnName].isVisible;
      },
    };
  });
}

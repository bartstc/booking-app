import create from 'zustand';
import { set as lodSet, debounce } from 'lodash';

import { ITableConfig } from './ITableConfig';

interface ITableConfigStore {
  config: ITableConfig;
  get(): void;
  toggle(columnName: string): void;
  // drag(columnIndex: number): void;
  isColumnVisible(columnName: string): boolean;
}

type LSTableConfigStore = Record<string, ITableConfig>;

const lsKey = 'table-configuration';
// const ignoredLabels = ['checkbox', 'collapse', 'actions'];

export function createTableConfigurationStore(initialConfig: ITableConfig, id: string) {
  const setLSStore = debounce(
    (configStore: LSTableConfigStore, config: ITableConfig) => localStorage.setItem(lsKey, JSON.stringify(lodSet(configStore, id, config))),
    500,
  );

  return create<ITableConfigStore>((set, get) => {
    const lsValue = localStorage.getItem(lsKey);
    const configStore: LSTableConfigStore = lsValue ? JSON.parse(lsValue) : {};

    const defaultConfig = configStore[id] ? configStore[id] : initialConfig;

    return {
      config: defaultConfig,
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

          setLSStore(configStore, config);

          return {
            config,
          };
        });
      },
      // drag(columnIndex: number) {
      //   const ignoredColumns = Object.entries(get().config).filter(([name]) => ignoredLabels.includes(name));
      //   const draggableColumns = Object.entries(get().config).filter(([name]) => !ignoredLabels.includes(name));
      //
      //   const draggableItem = draggableColumns[columnIndex];
      //
      //   draggableColumns.splice(columnIndex, 1);
      //   draggableColumns.splice(columnIndex, 0, draggableItem);
      //
      //   const config = draggableColumns.concat(ignoredColumns).reduce((values, [name, configItem]) => {
      //     return {
      //       ...values,
      //       [name]: configItem,
      //     };
      //   }, {} as ITableConfig);
      //
      //   setLSStore(configStore, config);
      //
      //   set(() => ({
      //     config,
      //   }));
      // },
      isColumnVisible(columnName: string): boolean {
        return get().config[columnName].isVisible;
      },
    };
  });
}

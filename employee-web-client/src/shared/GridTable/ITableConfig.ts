import { ResponsiveObject } from '@chakra-ui/styled-system/dist/types/utils/types';

export interface ITableColumnConfig {
  gridValue: string;
  isVisible: boolean;
  isSortable?: boolean;
  display?: ResponsiveObject<string>;
}

export interface ITableConfig {
  [name: string]: ITableColumnConfig;
}

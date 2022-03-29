import { ResponsiveObject } from '@chakra-ui/react';

export interface ITableColumnConfig {
  gridValue: string;
  isVisible: boolean;
  isSortable?: boolean;
  display?: ResponsiveObject<string>;
}

export interface ITableConfig {
  [name: string]: ITableColumnConfig;
}

import { ResponsiveObject } from '@chakra-ui/styled-system/dist/types/utils/types';

export interface ITableConfig {
  [name: string]: {
    gridValue: string;
    isVisible: boolean;
    isSortable: boolean;
    display?: ResponsiveObject<string>;
  };
}

import { ResponsiveValue } from '@chakra-ui/system';

export interface GridItemProps {
  colSpan?: ResponsiveValue<number | 'auto'>;
  colStart?: ResponsiveValue<number | 'auto'>;
  colEnd?: ResponsiveValue<number | 'auto'>;
  rowStart?: ResponsiveValue<number | 'auto'>;
  rowEnd?: ResponsiveValue<number | 'auto'>;
  rowSpan?: ResponsiveValue<number | 'auto'>;
}

import { ResponsiveValue } from '@chakra-ui/system';
import { filterUndefined, mapResponsive } from '@chakra-ui/utils';

export type GridProp = 'colSpan' | 'colStart' | 'colEnd' | 'rowEnd' | 'rowStart' | 'rowSpan';

export function mapGridProps({
  colSpan,
  colStart,
  colEnd,
  rowEnd,
  rowSpan,
  rowStart,
}: Record<GridProp, ResponsiveValue<number | 'auto'> | undefined>) {
  return filterUndefined({
    gridColumn: spanFn(colSpan),
    gridRow: spanFn(rowSpan),
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
  });
}

function spanFn(span?: ResponsiveValue<number | 'auto'>) {
  return mapResponsive(span, value => (value === 'auto' ? 'auto' : `span ${value}/span ${value}`));
}

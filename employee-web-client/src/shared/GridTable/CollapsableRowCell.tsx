import React from 'react';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

import { RowCell, IRowCellProps } from './RowCell';
import { Icon } from '../Icon';

interface IProps extends Omit<IRowCellProps, 'children'> {
  isOpen: boolean;
  name: string;
}

const CollapsableCell = ({ isOpen, name }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <RowCell name={name} borderLeft={isOpen ? `3px solid ${borderColor}` : '3px solid transparent'}>
      <Icon path={isOpen ? mdiChevronDown : mdiChevronRight} />
    </RowCell>
  );
};

export { CollapsableCell };

import React from 'react';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

import { ITruncatedCellProps, TruncatedCell } from './TruncatedCell';
import { Icon } from '../Icon';

interface IProps extends Omit<ITruncatedCellProps, 'children'> {
  isOpen: boolean;
}

const CollapsableCell = ({ isOpen }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[300], colors.gray[700]);

  return (
    <TruncatedCell borderLeft={isOpen ? `3px solid ${borderColor}` : '3px solid transparent'}>
      <Icon path={isOpen ? mdiChevronDown : mdiChevronRight} />
    </TruncatedCell>
  );
};

export { CollapsableCell };

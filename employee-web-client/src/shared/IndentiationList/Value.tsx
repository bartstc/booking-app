import React, { ReactNode } from 'react';
import { GridItemProps } from '@chakra-ui/react';

import { Value as DescriptionValue } from 'shared/DescriptionListV2';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const Value = ({ children, ...props }: IProps) => {
  return (
    <DescriptionValue colSpan={1} py={0} pb={2} {...props}>
      {children}
    </DescriptionValue>
  );
};

export { Value };

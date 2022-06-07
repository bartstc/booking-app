import React, { ReactNode } from 'react';
import { GridItemProps } from '@chakra-ui/react';

import { Label as DescriptionLabel } from 'shared/DescriptionListV2';

interface IProps extends GridItemProps {
  children: ReactNode;
}

const Label = ({ children, ...props }: IProps) => {
  return (
    <DescriptionLabel colSpan={1} py={0} {...props}>
      {children}
    </DescriptionLabel>
  );
};

export { Label };

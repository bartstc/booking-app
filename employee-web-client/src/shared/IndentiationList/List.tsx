import React, { ReactNode } from 'react';

import { List as DescriptionList } from 'shared/DescriptionListV2';
import { SimpleGridProps } from '@chakra-ui/react';

interface IProps extends SimpleGridProps {
  children: ReactNode;
}

const List = ({ children, ...props }: IProps) => {
  return (
    <DescriptionList spacingY={4} {...props}>
      {children}
    </DescriptionList>
  );
};

export { List };

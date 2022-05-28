import React from 'react';

import { GridItem, GridItemProps, Divider as ChDivider } from '@chakra-ui/react';

interface IProps extends GridItemProps {}

const Divider = (props: IProps) => {
  return (
    <GridItem colStart={1} colEnd={-1} colSpan={3} opacity={{ base: 0, lg: 1 }} {...props}>
      <ChDivider m={0} my={{ base: 1, lg: 0 }} />
    </GridItem>
  );
};

export { Divider };

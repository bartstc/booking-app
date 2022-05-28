import React from 'react';

import { Spacer as ChSpacer, GridItem, GridItemProps } from '@chakra-ui/react';

interface IProps extends GridItemProps {}

const Spacer = (props: IProps) => {
  return (
    <GridItem colStart={1} colEnd={-1} {...props}>
      <ChSpacer h={10} />
    </GridItem>
  );
};

export { Spacer };

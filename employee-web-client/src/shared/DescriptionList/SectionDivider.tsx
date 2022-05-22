import React from 'react';
import { Divider, DividerProps } from '@chakra-ui/react';

interface IProps extends DividerProps {}

const SectionDivider = (props: IProps) => {
  return <Divider {...props} />;
};

export { SectionDivider };

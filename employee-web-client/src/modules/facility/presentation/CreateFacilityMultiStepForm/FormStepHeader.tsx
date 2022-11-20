import React, { ReactNode } from 'react';
import { useBreakpointValue } from '@chakra-ui/react';

import { Header, Heading } from 'shared/DescriptionListV2';

interface IProps {
  children: ReactNode;
}

const FormStepHeader = ({ children }: IProps) => {
  const fontSize = useBreakpointValue({ base: 'x-large', md: 'xx-large' });

  return (
    <Header>
      <Heading fontSize={fontSize} textAlign='center' fontWeight='700'>
        {children}
      </Heading>
    </Header>
  );
};

export { FormStepHeader };

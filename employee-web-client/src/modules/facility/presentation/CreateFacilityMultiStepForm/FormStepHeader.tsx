import React, { ReactNode } from 'react';

import { Header, Heading } from 'shared/DescriptionListV2';

interface IProps {
  children: ReactNode;
}

const FormStepHeader = ({ children }: IProps) => {
  return (
    <Header>
      <Heading fontSize='xx-large' textAlign='center' fontWeight='700'>
        {children}
      </Heading>
    </Header>
  );
};

export { FormStepHeader };

import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';

interface IProps {
  children: ReactNode;
}

const Providers = ({ children }: IProps) => {
  return <IntlProvider locale='en'>{children}</IntlProvider>;
};

export { Providers };

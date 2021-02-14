import React, { Fragment, ReactNode } from 'react';

interface IProps {
  condition: boolean | undefined;
  children: ReactNode | string;
}

const If = ({ condition, children }: IProps) => {
  if (condition) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
};

export { If };

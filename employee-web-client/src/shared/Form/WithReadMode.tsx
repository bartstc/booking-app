import React, { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { Button } from '../Button';
import { FormStatus } from './FormStatus';

interface IProps {
  children: ReactNode;
}

const WithReadMode = ({ children }: IProps) => {
  const { status, setStatus } = useFormContext();

  if (status === FormStatus.Read_mode) {
    return (
      <Button colorScheme='blue' onClick={() => setStatus(FormStatus.Unsaved_changes)}>
        <FormattedMessage id='edit' defaultMessage='Edit' />
      </Button>
    );
  }

  return (
    <>
      <Button colorScheme='red' onClick={() => setStatus(FormStatus.Read_mode)}>
        <FormattedMessage id='cancel' defaultMessage='Cancel' />
      </Button>
      {children}
    </>
  );
};

export { WithReadMode };

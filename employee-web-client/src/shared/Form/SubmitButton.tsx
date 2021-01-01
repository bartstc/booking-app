import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';
import { ButtonProps, Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface IProps extends ButtonProps {
  children?: ReactNode | string;
}

const SubmitButton = ({ children = <FormattedMessage id='submit' defaultMessage='Submit' />, ...props }: IProps) => {
  const {
    errors,
    formState: { isSubmitting, isDirty },
  } = useFormContext();

  return (
    <Button
      id='submit-form-button'
      isLoading={isSubmitting}
      colorScheme='green'
      type='submit'
      isDisabled={!isEmpty(errors) || !isDirty}
      {...props}
    >
      {children}
    </Button>
  );
};

export { SubmitButton };

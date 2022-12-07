import React from 'react';
import { useIntl } from 'react-intl';

import { Button } from 'shared/Button';

import { ChevronRightIcon } from '@chakra-ui/icons';

const SubmitButton = () => {
  const { formatMessage } = useIntl();

  return (
    <Button variant='solid' colorScheme='green' id={`submit-facility-form`} rightIcon={<ChevronRightIcon />}>
      {formatMessage({ id: 'submit', defaultMessage: 'Submit' })}
    </Button>
  );
};

export { SubmitButton };

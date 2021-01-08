import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Image, useBreakpointValue } from '@chakra-ui/react';

import image from '../../assets/images/client-error.png';
import { HomeButton, State } from './components';

const ClientErrorState = () => {
  const { formatMessage } = useIntl();
  const size = useBreakpointValue({ base: '190px', md: '400px', lg: '520px' });

  return (
    <State
      image={
        <Image
          src={image}
          alt={formatMessage({
            id: 'client-error',
            defaultMessage: 'Repairing',
          })}
          width={size}
        />
      }
      header={<FormattedMessage id='client-error-header' defaultMessage='Unexpected client error' />}
      description={
        <FormattedMessage
          id='client-error-description'
          defaultMessage='An unexpected error has occurred on the client side. Contact the administrators for more information.'
        />
      }
    >
      <HomeButton mt={4} />
    </State>
  );
};

export { ClientErrorState };

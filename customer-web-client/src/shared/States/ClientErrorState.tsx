import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import image from '../../assets/images/server-error.png';
import { HomeButton, State } from './components';

const ClientErrorState = () => {
  const { formatMessage } = useIntl();

  return (
    <State
      image={image}
      alt={formatMessage({
        id: 'client-error',
        defaultMessage: 'Repairing',
      })}
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

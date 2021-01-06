import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { State } from './State';
import image from '../../assets/images/maintenance.png';
import { HomeButton } from './HomeButton';

const MaintenanceState = () => {
  const { formatMessage } = useIntl();

  return (
    <State
      image={image}
      alt={formatMessage({
        id: 'maintenance',
        defaultMessage: 'Maintenance',
      })}
      header={<FormattedMessage id='maintenance-header' defaultMessage='Maintenance in progress' />}
      description={<FormattedMessage id='maintenance-description' defaultMessage='The service will be unavailable for some time.' />}
      mt={{ base: 20, md: 40, lg: 20 }}
    >
      <HomeButton mt={4} />
    </State>
  );
};

export { MaintenanceState };

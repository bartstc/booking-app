import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Image, useBreakpointValue } from '@chakra-ui/react';

import image from '../../assets/images/offline.png';
import { HomeButton, State } from './components';

const OfflineState = () => {
  const { formatMessage } = useIntl();
  const size = useBreakpointValue({ base: '220px', md: '420px', lg: '560px' });

  return (
    <State
      image={
        <Image
          src={image}
          alt={formatMessage({
            id: 'offline',
            defaultMessage: 'Offline',
          })}
          width={size}
          mt={8}
        />
      }
      header={<FormattedMessage id='offline-header' defaultMessage='You are offline' />}
      description={
        <FormattedMessage id='offline-description' defaultMessage='This is not a problem with our service. Please connect to the web.' />
      }
      mt={{ base: 20, md: 40, lg: 20 }}
    >
      <HomeButton mt={4} />
    </State>
  );
};

export { OfflineState };

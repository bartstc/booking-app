import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Image, useBreakpointValue } from '@chakra-ui/react';

import { State } from './State';
import image from '../../assets/images/not-found.png';
import { HomeButton } from './HomeButton';

const NotFoundState = () => {
  const { formatMessage } = useIntl();
  const size = useBreakpointValue({ base: '280px', md: '560px', lg: '840px' });

  return (
    <State
      image={
        <Image
          src={image}
          alt={formatMessage({
            id: 'not-found-error',
            defaultMessage: 'Not found',
          })}
          width={size}
          mt={8}
        />
      }
      header={<FormattedMessage id='not-found-header' defaultMessage='Page not found' />}
      description={<FormattedMessage id='not-found-description' defaultMessage='Page does not exist. Maybe you came here by accident?' />}
      mt={{ base: 20, md: 40, lg: 20 }}
    >
      <HomeButton mt={4} />
    </State>
  );
};

export { NotFoundState };

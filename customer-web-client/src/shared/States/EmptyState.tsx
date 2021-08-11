import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Image, useBreakpointValue } from '@chakra-ui/react';

import image from '../../assets/images/no-results.png';
import { State } from './components';

const EmptyState = () => {
  const { formatMessage } = useIntl();
  const size = useBreakpointValue({ base: '210px', md: '360px', lg: '460px' });

  return (
    <State
      image={
        <Image
          src={image}
          alt={formatMessage({
            id: 'empty-error',
            defaultMessage: 'CustomersList is empty',
          })}
          width={size}
          mt={8}
        />
      }
      header={<FormattedMessage id='empty-state-header' defaultMessage='List is empty' />}
      description={
        <FormattedMessage id='not-found-description' defaultMessage='If you think there is a problem, please contact our administrator.' />
      }
    />
  );
};

export { EmptyState };

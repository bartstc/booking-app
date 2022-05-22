import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';
import { isMobileOnly } from 'react-device-detect';
import { mdiCalendar } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

import { Breadcrumbs } from './Breadcrumbs';

const Header = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const title = formatMessage({
    id: 'back-to-calendar',
    defaultMessage: 'Back to calendar',
  });

  return (
    <VStack spacing={6} w='100%' align='stretch'>
      <PageHeader>
        <PageDescription>
          <PageHeading>
            <FormattedMessage id='bookings-heading' defaultMessage='Bookings' />
          </PageHeading>
          <PageSubheading>
            <FormattedMessage id='add-booking-subheading' defaultMessage='Add new booking' />
          </PageSubheading>
        </PageDescription>
        {isMobileOnly ? (
          <IconButton
            onClick={() => push('bookings')}
            colorScheme='primary'
            variant='solid'
            title={title}
            icon={<Icon path={mdiCalendar} color='gray.800' />}
          />
        ) : (
          <Button onClick={() => push('bookings')} colorScheme='primary' leftIcon={<Icon path={mdiCalendar} />}>
            {title}
          </Button>
        )}
      </PageHeader>
      <Breadcrumbs />
    </VStack>
  );
};

export { Header };

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { isMobileOnly } from 'react-device-detect';
import { mdiCalendar } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

const Header = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const title = formatMessage({
    id: 'add-reservation',
    defaultMessage: 'Add reservation',
  });

  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>
          <FormattedMessage id='bookings-heading' defaultMessage='Bookings' />
        </PageHeading>
        <PageSubheading>
          <FormattedMessage id='bookings-subheading' defaultMessage='Manage yours bookings' />
        </PageSubheading>
      </PageDescription>
      {isMobileOnly ? (
        <IconButton
          onClick={() => navigate('/add-booking')}
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiCalendar} color='gray.800' />}
        />
      ) : (
        <Button onClick={() => navigate('/add-booking')} colorScheme='primary' leftIcon={<Icon path={mdiCalendar} />}>
          {title}
        </Button>
      )}
    </PageHeader>
  );
};

export { Header };

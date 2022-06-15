import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiBook } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

import { AddOfferModal, useAddOfferModalStore } from 'modules/offers/presentation';

const Header = () => {
  const { formatMessage } = useIntl();
  const onOpen = useAddOfferModalStore(store => store.onOpen);

  const title = formatMessage({
    id: 'add-offer',
    defaultMessage: 'Add offer',
  });

  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>
          <FormattedMessage id='offers-heading' defaultMessage='Offers' />
        </PageHeading>
        <PageSubheading>
          <FormattedMessage id='offers-subheading' defaultMessage='Manage your offer list' />
        </PageSubheading>
      </PageDescription>
      <AddOfferModal />
      {isMobileOnly ? (
        <IconButton colorScheme='primary' variant='solid' title={title} icon={<Icon path={mdiBook} color='gray.800' />} onClick={onOpen} />
      ) : (
        <Button colorScheme='primary' leftIcon={<Icon path={mdiBook} />} onClick={onOpen}>
          {title}
        </Button>
      )}
    </PageHeader>
  );
};

export { Header };

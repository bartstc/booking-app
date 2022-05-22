import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiAccount } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

import { AddCustomerModal } from 'modules/customers/presentation';

const Header = () => {
  const { formatMessage } = useIntl();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const title = formatMessage({
    id: 'add-customer',
    defaultMessage: 'Add customer',
  });

  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>
          <FormattedMessage id='customers-heading' defaultMessage='Customers' />
        </PageHeading>
        <PageSubheading>
          <FormattedMessage id='customers-subheading' defaultMessage='Manage your customer list' />
        </PageSubheading>
      </PageDescription>
      <AddCustomerModal isOpen={isOpen} onClose={onClose} />
      {isMobileOnly ? (
        <IconButton
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiAccount} color='gray.800' />}
          onClick={onOpen}
        />
      ) : (
        <Button colorScheme='primary' leftIcon={<Icon path={mdiAccount} />} onClick={onOpen}>
          {title}
        </Button>
      )}
    </PageHeader>
  );
};

export { Header };

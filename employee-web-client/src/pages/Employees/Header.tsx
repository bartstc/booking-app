import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiAccount } from '@mdi/js';
import { isMobileOnly } from 'react-device-detect';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

import { AddEmployeeModal, useAddEmployeeModalStore } from 'modules/employees/presentation';

const Header = () => {
  const { formatMessage } = useIntl();
  const onOpen = useAddEmployeeModalStore(store => store.onOpen);

  const title = formatMessage({
    id: 'add-employee',
    defaultMessage: 'Add employee',
  });

  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>
          <FormattedMessage id='employees-heading' defaultMessage='Employees' />
        </PageHeading>
        <PageSubheading>
          <FormattedMessage id='employees-subheading' defaultMessage='Manage your employee list' />
        </PageSubheading>
      </PageDescription>
      <AddEmployeeModal />
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

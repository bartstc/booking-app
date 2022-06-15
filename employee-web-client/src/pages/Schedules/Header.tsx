import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isMobileOnly } from 'react-device-detect';
import { mdiFile } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';
import { PageDescription, PageHeader, PageHeading, PageSubheading } from 'shared/Layout';

import { CreateScheduleModal, useCreateScheduleModalStore } from 'modules/schedules/presentation';
import { useFacilityContextSelector } from 'modules/context';

const Header = () => {
  const { formatMessage } = useIntl();

  const onOpen = useCreateScheduleModalStore(store => store.onOpen);
  const facilityId = useFacilityContextSelector(state => state.facilityId);

  const title = formatMessage({
    id: 'add-schedule',
    defaultMessage: 'Add schedule',
  });

  return (
    <PageHeader>
      <PageDescription>
        <PageHeading>
          <FormattedMessage id='schedules-heading' defaultMessage='Schedules' />
        </PageHeading>
        <PageSubheading>
          <FormattedMessage id='schedules-subheading' defaultMessage='Manage your schedules' />
        </PageSubheading>
      </PageDescription>
      <CreateScheduleModal creatorId={facilityId} facilityId={facilityId} />
      {isMobileOnly ? (
        <IconButton
          onClick={onOpen}
          ml={2}
          colorScheme='primary'
          variant='solid'
          title={title}
          icon={<Icon path={mdiFile} color='gray.800' />}
        />
      ) : (
        <Button onClick={onOpen} colorScheme='primary' leftIcon={<Icon path={mdiFile} />}>
          {title}
        </Button>
      )}
    </PageHeader>
  );
};

export { Header };

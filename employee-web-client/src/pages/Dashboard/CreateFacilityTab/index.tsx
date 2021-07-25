import React from 'react';
import { Heading, HStack } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiArrowLeft } from '@mdi/js';
import { useHistory } from 'react-router-dom';

import { useEmployeeContextSelector, useEnterpriseContextSelector } from 'modules/context';
import { CreateFacilityForm } from 'modules/facility/presentation';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';
import { IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { DashboardTabs } from '../DashboardTabs';

const CreateFacilityTab = () => {
  const { formatMessage } = useIntl();
  const { push } = useHistory();

  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);
  const employeeId = useEmployeeContextSelector(state => state.employeeId);

  return (
    <DashboardTabs>
      <HStack mb={{ base: 6, md: 10 }} m='0 auto' w='100%'>
        <IconButton
          onClick={() => push(buildUrl(`/dashboard/facilities`, DEFAULT_PARAMS))}
          variant='ghost'
          title={formatMessage({ id: 'bask-to-list', defaultMessage: 'Back to list' })}
          icon={<Icon path={mdiArrowLeft} />}
        />
        <Heading pl={3} as='h2' fontWeight='500' fontSize={{ base: 'xl', md: '2xl' }}>
          <FormattedMessage id='register-new-facility' defaultMessage='Register new facility' />
        </Heading>
      </HStack>
      <CreateFacilityForm enterpriseId={enterpriseId} employeeId={employeeId} />
    </DashboardTabs>
  );
};

export default CreateFacilityTab;

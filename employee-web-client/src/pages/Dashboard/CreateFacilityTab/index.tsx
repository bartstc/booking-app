import React from 'react';
import { HStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { mdiArrowLeft } from '@mdi/js';
import { useNavigate } from 'react-router-dom';

import { useEmployeeContextSelector, useEnterpriseContextSelector } from 'modules/context';
import { CreateFacilityMultiStepForm } from 'modules/facility/presentation';

import { IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

import { DashboardTabs } from '../DashboardTabs';

const CreateFacilityTab = () => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);
  const employeeId = useEmployeeContextSelector(state => state.employeeId);

  return (
    <DashboardTabs>
      <HStack mb={{ base: 6, md: 10 }} m='0 auto' w='100%'>
        <IconButton
          onClick={() => navigate(`/dashboard/facilities`)}
          variant='ghost'
          title={formatMessage({ id: 'back-to-list', defaultMessage: 'Back to list' })}
          icon={<Icon path={mdiArrowLeft} />}
        />
      </HStack>
      <CreateFacilityMultiStepForm
        enterpriseId={enterpriseId}
        employeeId={employeeId}
        onSuccess={() => navigate(`/dashboard/facilities`)}
      />
    </DashboardTabs>
  );
};

export default CreateFacilityTab;

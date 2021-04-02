import React from 'react';
import { Heading } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { CreateFacilityForm } from 'modules/facility/containers/CreateFacilityForm';

import { DashboardTabs } from '../DashboardTabs';

const CreateFacilityTab = () => {
  return (
    <DashboardTabs>
      <Heading mb={{ base: 6, md: 8 }} textAlign='center' as='h2' fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}>
        <FormattedMessage id='register-new-facility' defaultMessage='Register new facility' />
      </Heading>
      <CreateFacilityForm />
    </DashboardTabs>
  );
};

export default CreateFacilityTab;

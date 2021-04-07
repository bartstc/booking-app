import React from 'react';
import { Heading } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { CreateFacilityForm } from 'modules/facility/presentation/CreateFacilityForm';

import { DashboardTabs } from '../DashboardTabs';

const CreateFacilityTab = () => {
  return (
    <DashboardTabs>
      <Heading m='0 auto' maxW='670px' mb={{ base: 6, md: 8 }} as='h2' fontSize={{ base: '2xl', md: '3xl' }}>
        <FormattedMessage id='register-new-facility' defaultMessage='Register new facility' />
      </Heading>
      <CreateFacilityForm />
    </DashboardTabs>
  );
};

export default CreateFacilityTab;

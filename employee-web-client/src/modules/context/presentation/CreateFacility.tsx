import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Divider, VStack } from '@chakra-ui/react';

import { SectionHeader, SectionSubtitle, SectionTitle } from 'shared/ReadMode';
import { RegisterFirstFacilityForm } from 'modules/facility/presentation';

interface IProps {
  enterpriseId: string;
  employeeId: string;
  employeeEmail: string;
}

const CreateFacility = ({ enterpriseId, employeeId, employeeEmail }: IProps) => {
  return (
    <VStack spacing={8} py={16} display='stretch' m='0 auto' maxW='800px'>
      <VStack>
        <SectionHeader spacing={3}>
          <SectionTitle fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
            <FormattedMessage id='register-facility' defaultMessage='Register first facility' />
          </SectionTitle>
          <SectionSubtitle>
            <FormattedMessage
              id='register-facility-info'
              defaultMessage='Our system allows you to register many facilities that you own. To get you started, we suggest you add the first one. The rest can always be added later from the dashboard tab.'
            />
          </SectionSubtitle>
        </SectionHeader>
      </VStack>
      <Divider />
      <RegisterFirstFacilityForm employeeId={employeeId} enterpriseId={enterpriseId} employeeEmail={employeeEmail} />
    </VStack>
  );
};

export { CreateFacility };

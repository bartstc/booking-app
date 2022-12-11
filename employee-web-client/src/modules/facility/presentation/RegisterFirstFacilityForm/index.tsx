import React from 'react';
import { HStack, VStack, Divider } from '@chakra-ui/react';

import { useRegisterFacility } from 'modules/facility/infrastructure/command';

import { SubmitButton } from 'shared/Form';
import { SectionContainer } from 'shared/DescriptionList';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../FacilityForm';
import { useCreateFacilityNotification } from '../FacilityForm';

interface IProps {
  enterpriseId: string;
  employeeId: string;
  employeeEmail: string;
}

const RegisterFirstFacilityForm = ({ enterpriseId, employeeId, employeeEmail }: IProps) => {
  const [handler, isLoading] = useRegisterFacility(enterpriseId, employeeId, employeeEmail);

  const { showCreateFailureNotification, showCreateSuccessNotification } = useCreateFacilityNotification();

  return (
    <FacilityForm
      onSubmit={async model => {
        try {
          await handler(model);
          showCreateSuccessNotification();
        } catch {
          showCreateFailureNotification();
        }
      }}
    >
      <VStack w='100%' m='0 auto' align='stretch' spacing={6} pb={8}>
        <SectionContainer>
          <MetaInputs />
          <Divider />
          <WorkingHoursInputs />
          <Divider />
          <ContactsInputs />
          <Divider />
          <AddressInputs />
          <Divider />
          <ContactPersonInputs />
        </SectionContainer>
        <HStack justify='flex-end'>
          <SubmitButton size='lg' form='create-facility' isLoading={isLoading} />
        </HStack>
      </VStack>
    </FacilityForm>
  );
};

export { RegisterFirstFacilityForm };

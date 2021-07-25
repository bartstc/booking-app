import React from 'react';
import { useQueryClient } from 'react-query';
import { HStack, VStack, Divider } from '@chakra-ui/react';

import { useCreateFacility } from 'modules/facility/infrastructure/command';

import { SubmitButton } from 'shared/Form';
import { SectionContainer } from 'shared/ReadMode';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../FacilityForm';
import { useCreateFacilityNotification } from '../CreateFacilityForm/useCreateFacilityNotification';
import { IEmployee } from '../../../employees/application/types';
import { employeeByEmailQueryKey } from '../../../employees/infrastructure/query';

interface IProps {
  enterpriseId: string;
  employeeId: string;
  employeeEmail: string;
}

const RegisterFirstFacilityForm = ({ enterpriseId, employeeId, employeeEmail }: IProps) => {
  const queryClient = useQueryClient();

  const [handler, isLoading] = useCreateFacility(enterpriseId, employeeId, async facilityId => {
    await queryClient.setQueryData<IEmployee | undefined>(employeeByEmailQueryKey(employeeEmail), data => {
      if (!data) return;

      return {
        ...data,
        scope: {
          ...data.scope,
          facilityIds: [facilityId],
        },
      };
    });
  });

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

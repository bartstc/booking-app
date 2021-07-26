import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HStack, VStack, Divider } from '@chakra-ui/react';
import { useQueryClient } from 'react-query';

import { useCreateFacility } from 'modules/facility/infrastructure/command';
import { employeeQueryKey } from 'modules/employees/infrastructure/query';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { SectionContainer } from 'shared/ReadMode';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../FacilityForm';
import { useCreateFacilityNotification } from './useCreateFacilityNotification';

interface IProps {
  enterpriseId: string;
  employeeId: string;
}

const CreateFacilityForm = ({ enterpriseId, employeeId }: IProps) => {
  const queryClient = useQueryClient();
  const { push } = useHistory();

  const [handler, isLoading] = useCreateFacility(enterpriseId, employeeId, async () => {
    await queryClient.invalidateQueries(employeeQueryKey(enterpriseId, employeeId));
  });
  const { showCreateFailureNotification, showCreateSuccessNotification } = useCreateFacilityNotification();

  return (
    <FacilityForm
      onSubmit={async model => {
        try {
          await handler(model);
          showCreateSuccessNotification();
          push(buildUrl(`dashboard/facilities`, DEFAULT_PARAMS));
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
          <SubmitButton form='create-facility' isLoading={isLoading} />
          <Button colorScheme='gray' ml={3} onClick={() => push(buildUrl(`dashboard/facilities`, DEFAULT_PARAMS))}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
        </HStack>
      </VStack>
    </FacilityForm>
  );
};

export { CreateFacilityForm };

import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HStack, VStack } from '@chakra-ui/react';

import { CreateFacilityForm as FacilityForm } from 'modules/facility/application/createFacility/CreateFacilityForm';
import { useCreateFacility } from 'modules/facility/infrastructure/command';
import { useEnterpriseConsumer } from 'modules/context';
import {
  ContactPersonInputs,
  AddressInputs,
  WorkingHoursInputs,
  MetaInputs,
  ContactsInputs,
  useCreateFacilityNotification,
} from 'modules/facility/application/createFacility';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

const CreateFacilityForm = () => {
  const { enterpriseId } = useEnterpriseConsumer();
  const { push } = useHistory();
  const [handler, isLoading] = useCreateFacility(enterpriseId);
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
      <VStack w='100%' m='0 auto' maxW='650px' align='stretch' spacing={6}>
        <MetaInputs />
        <WorkingHoursInputs />
        <ContactsInputs />
        <AddressInputs />
        <ContactPersonInputs />
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

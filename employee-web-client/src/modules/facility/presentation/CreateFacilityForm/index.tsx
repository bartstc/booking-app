import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HStack, VStack, Flex } from '@chakra-ui/react';

import { useCreateFacility } from 'modules/facility/infrastructure/command';
import { useEnterpriseConsumer } from 'modules/context';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { TreeCounter } from 'shared/TreeCounter';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../FacilityForm';
import { useCreateFacilityNotification } from './useCreateFacilityNotification';

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
      <VStack w='100%' m='0 auto' maxW='670px' align='stretch' spacing={6}>
        <Flex>
          <TreeCounter index={0} fieldsCount={2} />
          <MetaInputs />
        </Flex>
        <Flex>
          <TreeCounter index={1} fieldsCount={2} />
          <WorkingHoursInputs />
        </Flex>
        <Flex>
          <TreeCounter index={2} fieldsCount={2} />
          <ContactsInputs />
        </Flex>
        <Flex>
          <TreeCounter index={3} fieldsCount={2} />
          <AddressInputs />
        </Flex>
        <Flex>
          <TreeCounter index={4} fieldsCount={2} />
          <ContactPersonInputs />
        </Flex>
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

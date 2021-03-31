import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';
import { CreateFacilityForm } from 'modules/facility/application/createFacility/CreateFacilityForm';
import {
  ContactPersonInputs,
  AddressInputs,
  WorkingHoursInputs,
  MetaInputs,
  ContactsInputs,
  useCreateFacilityNotification,
} from 'modules/facility/application/createFacility';
import { CreateFacilityMapper } from 'modules/facility/adapter/createFacility';
import { useCreateFacility } from 'modules/facility/infrastructure/command';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';
import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';

const EditFacilityForm = () => {
  const params = useParams<{ facilitySlug: string }>();
  const { push } = useHistory();
  const { data } = useFacilityQuery(params.facilitySlug);

  const [handler, isLoading] = useCreateFacility(data.enterpriseId, data.facilityId);
  const { showUpdateFailureNotification, showUpdateSuccessNotification } = useCreateFacilityNotification();

  return (
    <CreateFacilityForm
      defaultValues={CreateFacilityMapper.modelToForm(data)}
      onSubmit={async model => {
        try {
          await handler(model);
          showUpdateSuccessNotification();
          push(buildUrl(`dashboard/facilities`, DEFAULT_PARAMS));
        } catch {
          showUpdateFailureNotification();
        }
      }}
    >
      <VStack w='100%' align='stretch' spacing={6}>
        <HStack justify='flex-end'>
          <SubmitButton isLoading={isLoading} />
          <Button colorScheme='gray' ml={3} onClick={() => push(`dashboard/facilities/${data.slug}`)}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
        </HStack>
        <SimpleGrid columns={2} spacingY={{ base: 8, md: 0 }} spacingX={{ md: 8, lg: 14 }}>
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <VStack spacing={4} align='flex-start'>
              <MetaInputs />
              <WorkingHoursInputs />
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <VStack spacing={4} align='flex-start'>
              <ContactsInputs />
              <AddressInputs />
              <ContactPersonInputs />
            </VStack>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </CreateFacilityForm>
  );
};

export { EditFacilityForm };

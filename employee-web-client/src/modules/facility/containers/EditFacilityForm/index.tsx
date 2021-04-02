import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';
import { useCreateFacility } from 'modules/facility/infrastructure/command';
import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';
import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../shared/FacilityForm';
import { useEditFacilityNotification, CreateFacilityMapper } from '../../application';

const EditFacilityForm = () => {
  const params = useParams<{ facilitySlug: string }>();
  const { push } = useHistory();
  const facility = useFacilityQuery(params.facilitySlug);

  const [handler, isLoading] = useCreateFacility(facility.enterpriseId, facility.facilityId);
  const { showEditFailureNotification, showEditSuccessNotification } = useEditFacilityNotification();

  return (
    <FacilityForm
      defaultValues={CreateFacilityMapper.modelToForm(facility)}
      onSubmit={async model => {
        try {
          await handler(model);
          showEditSuccessNotification();
          push(buildUrl(`dashboard/facilities`, DEFAULT_PARAMS));
        } catch {
          showEditFailureNotification();
        }
      }}
    >
      <VStack w='100%' align='stretch' spacing={6}>
        <HStack justify='flex-end'>
          <SubmitButton isLoading={isLoading} />
          <Button colorScheme='gray' ml={3} onClick={() => push(`dashboard/facilities/${facility.slug}`)}>
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
    </FacilityForm>
  );
};

export { EditFacilityForm };

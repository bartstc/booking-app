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
} from 'modules/facility/application/createFacility';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';

const EditFacilityForm = () => {
  const params = useParams<{ facilitySlug: string }>();
  const { push } = useHistory();

  const { data } = useFacilityQuery(params.facilitySlug);

  return (
    <CreateFacilityForm
      onSubmit={model => {
        console.log(model);
      }}
    >
      <VStack w='100%' align='stretch' spacing={6}>
        <HStack justify='flex-end'>
          <SubmitButton isLoading={false} />
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

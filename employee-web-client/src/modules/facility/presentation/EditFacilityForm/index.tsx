import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HStack, Divider, VStack } from '@chakra-ui/react';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';
import { useUpdateFacility } from 'modules/facility/infrastructure/command';
import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { SectionContainer } from 'shared/DescriptionList';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../FacilityForm';
import { useEditFacilityNotification } from './useEditFacilityNotification';
import { CreateFacilityMapper } from '../../application';

const EditFacilityForm = () => {
  const params = useParams<{ facilitySlug: string }>();
  const navigate = useNavigate();
  const facility = useFacilityQuery(params.facilitySlug!);

  const [handler, isLoading] = useUpdateFacility(facility.enterpriseId, facility.facilityId);
  const { showEditFailureNotification, showEditSuccessNotification } = useEditFacilityNotification();

  return (
    <FacilityForm
      defaultValues={CreateFacilityMapper.modelToForm(facility)}
      onSubmit={async model => {
        try {
          await handler(model);
          showEditSuccessNotification();
          navigate(`/dashboard/facilities`);
        } catch {
          showEditFailureNotification();
        }
      }}
    >
      <VStack w='100%' align='stretch' spacing={6}>
        <HStack justify='flex-end'>
          <SubmitButton isLoading={isLoading} />
          <Button colorScheme='gray' ml={3} onClick={() => navigate(`/dashboard/facilities/${facility.slug}`)}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
        </HStack>
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
      </VStack>
    </FacilityForm>
  );
};

export { EditFacilityForm };

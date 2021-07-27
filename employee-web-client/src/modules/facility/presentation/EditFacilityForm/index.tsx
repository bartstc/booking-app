import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HStack, Divider, VStack } from '@chakra-ui/react';

import { useFacilityQuery } from 'modules/facility/infrastructure/query';
import { useUpdateFacility } from 'modules/facility/infrastructure/command';
import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';
import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { SectionContainer } from 'shared/ReadMode';

import { ContactPersonInputs, AddressInputs, WorkingHoursInputs, MetaInputs, ContactsInputs, FacilityForm } from '../FacilityForm';
import { useEditFacilityNotification } from './useEditFacilityNotification';
import { CreateFacilityMapper } from '../../application';

const EditFacilityForm = () => {
  const params = useParams<{ facilitySlug: string }>();
  const { push } = useHistory();
  const facility = useFacilityQuery(params.facilitySlug);

  const [handler, isLoading] = useUpdateFacility(facility.enterpriseId, facility.facilityId);
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

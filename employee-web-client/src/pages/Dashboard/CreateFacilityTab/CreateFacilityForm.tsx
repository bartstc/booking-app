import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HStack, VStack } from '@chakra-ui/react';

import { CreateFacilityForm as FacilityForm } from 'modules/facility/application/createFacility/CreateFacilityForm';
import {
  ContactPersonInputs,
  AddressInputs,
  WorkingHoursInputs,
  MetaInputs,
  ContactsInputs,
} from 'modules/facility/application/createFacility';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';

const CreateFacilityForm = () => {
  const { push } = useHistory();

  return (
    <FacilityForm
      onSubmit={model => {
        console.log(model);
      }}
    >
      <VStack w='100%' m='0 auto' maxW='650px' align='stretch' spacing={6}>
        <MetaInputs />
        <WorkingHoursInputs />
        <ContactsInputs />
        <AddressInputs />
        <ContactPersonInputs />
        <HStack justify='flex-end'>
          <SubmitButton isLoading={false} />
          <Button colorScheme='gray' ml={3} onClick={() => push(buildUrl(`dashboard/facilities`, DEFAULT_PARAMS))}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
        </HStack>
      </VStack>
    </FacilityForm>
  );
};

export { CreateFacilityForm };

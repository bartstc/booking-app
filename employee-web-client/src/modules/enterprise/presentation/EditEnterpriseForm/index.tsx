import React from 'react';
import { HStack, VStack, Divider } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';
import { SectionContainer } from 'shared/DescriptionList';

import { useEnterpriseContextSelector } from 'modules/context';
import { useEnterpriseQuery } from 'modules/enterprise/infrastructure/query';
import { useUpdateEnterprise } from 'modules/enterprise/infrastructure/command';

import { ContactPersonInputs, EnterpriseForm, MetaInputs, useEditEnterpriseNotification } from '../EnterpriseForm';

const EditEnterpriseForm = () => {
  const navigate = useNavigate();
  const enterpriseId = useEnterpriseContextSelector(state => state.enterpriseId);
  const enterprise = useEnterpriseQuery(enterpriseId);

  const [handler, isLoading] = useUpdateEnterprise(enterpriseId);
  const { showUpdateFailureNotification, showUpdateSuccessNotification } = useEditEnterpriseNotification();

  return (
    <EnterpriseForm
      defaultValues={enterprise}
      onSubmit={async model => {
        try {
          await handler(model);
          showUpdateSuccessNotification();
          navigate('/dashboard/enterprise');
        } catch (e) {
          showUpdateFailureNotification();
        }
      }}
    >
      <VStack w='100%' align='stretch' spacing={6}>
        <HStack justify='flex-end'>
          <SubmitButton isLoading={isLoading} />
          <Button colorScheme='gray' ml={3} onClick={() => navigate('/dashboard/enterprise')}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
        </HStack>
        <SectionContainer>
          <MetaInputs />
          <Divider />
          <ContactPersonInputs />
        </SectionContainer>
      </VStack>
    </EnterpriseForm>
  );
};

export { EditEnterpriseForm };

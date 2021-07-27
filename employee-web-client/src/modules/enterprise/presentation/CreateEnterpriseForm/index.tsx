import React from 'react';
import { Divider, HStack, VStack } from '@chakra-ui/react';

import { SubmitButton } from 'shared/Form';
import { SectionContainer } from 'shared/ReadMode';

import { ContactPersonInputs, EnterpriseForm, MetaInputs, useEditEnterpriseNotification } from '../EnterpriseForm';
import { useCreateEnterprise } from '../../infrastructure/command';

interface IProps {
  ownerId: string;
}

const CreateEnterpriseForm = ({ ownerId }: IProps) => {
  const [create, isLoading] = useCreateEnterprise(ownerId);
  const { showCreateSuccessNotification, showCreateFailureNotification } = useEditEnterpriseNotification();

  return (
    <EnterpriseForm
      onSubmit={async model => {
        try {
          await create(model);
          showCreateSuccessNotification();
        } catch {
          showCreateFailureNotification();
        }
      }}
    >
      <VStack w='100%' align='stretch'>
        <SectionContainer>
          <MetaInputs />
          <Divider />
          <ContactPersonInputs />
        </SectionContainer>
        <HStack justify='flex-end'>
          <SubmitButton size='lg' isLoading={isLoading} />
        </HStack>
      </VStack>
    </EnterpriseForm>
  );
};

export { CreateEnterpriseForm };

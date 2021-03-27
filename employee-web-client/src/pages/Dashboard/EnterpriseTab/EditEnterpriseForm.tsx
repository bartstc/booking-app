import React from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';

import { SubmitButton } from 'shared/Form';

import { useEnterpriseConsumer } from 'modules/context';
import { useEnterpriseQuery } from 'modules/enterprise/infrastructure/query';
import { useCreateEnterprise } from 'modules/enterprise/infrastructure/command';
import {
  ContactPersonInputs,
  CreateEnterpriseForm,
  MetaInputs,
  useCreateEnterpriseNotification,
} from 'modules/enterprise/application/createEnterprise';

const EditEnterpriseForm = () => {
  const { enterpriseId } = useEnterpriseConsumer();
  const { data } = useEnterpriseQuery(enterpriseId);
  const [handler, isLoading] = useCreateEnterprise(enterpriseId);
  const { showUpdateFailureNotification, showUpdateSuccessNotification } = useCreateEnterpriseNotification();

  return (
    <CreateEnterpriseForm
      defaultValues={data}
      onSubmit={async model => {
        try {
          await handler(model);
          showUpdateSuccessNotification();
        } catch (e) {
          showUpdateFailureNotification();
        }
      }}
    >
      <Stack direction={{ base: 'column', md: 'row' }} align='flex-start' justify='space-between'>
        <MetaInputs />
        <Box w='100%' pt={{ base: 4, md: 0 }} pl={{ base: 0, md: 8, lg: 12 }}>
          <ContactPersonInputs />
        </Box>
      </Stack>
      <HStack mt={4}>
        <SubmitButton isLoading={isLoading} />
      </HStack>
    </CreateEnterpriseForm>
  );
};

export { EditEnterpriseForm };

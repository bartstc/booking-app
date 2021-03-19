import React from 'react';
import { Box, HStack, Stack } from '@chakra-ui/react';

import { FormStatus, SubmitButton, WithReadMode } from 'shared/Form';

import { useEnterpriseConsumer } from 'modules/context';
import { useGetEnterprise } from 'modules/enterprise/infrastructure/query';
import { useCreateEnterprise } from 'modules/enterprise/infrastructure/command';
import {
  ContactPersonInputs,
  CreateEnterpriseForm,
  MetaInputs,
  useCreateEnterpriseNotification,
} from 'modules/enterprise/application/createEnterprise';

const EditEnterpriseForm = () => {
  const { enterpriseId } = useEnterpriseConsumer();
  const { data } = useGetEnterprise(enterpriseId);
  const [handler, isLoading] = useCreateEnterprise(enterpriseId);
  const { showUpdateFailureNotification, showUpdateSuccessNotification } = useCreateEnterpriseNotification();

  return (
    <CreateEnterpriseForm
      defaultValues={data}
      status={FormStatus.Read_mode}
      onSubmit={async (model, { setStatus }) => {
        try {
          await handler(model);
          setStatus(FormStatus.Read_mode);
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
        <WithReadMode>
          <SubmitButton isLoading={isLoading} />
        </WithReadMode>
      </HStack>
    </CreateEnterpriseForm>
  );
};

export { EditEnterpriseForm };

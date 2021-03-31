import React from 'react';
import { HStack, VStack, SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { SubmitButton } from 'shared/Form';
import { Button } from 'shared/Button';

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
  const { push } = useHistory();
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
          push('dashboard/enterprise');
        } catch (e) {
          showUpdateFailureNotification();
        }
      }}
    >
      <VStack w='100%' align='stretch' spacing={6}>
        <HStack justify='flex-end'>
          <SubmitButton isLoading={isLoading} />
          <Button colorScheme='gray' ml={3} onClick={() => push('dashboard/enterprise')}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
        </HStack>
        <SimpleGrid columns={2} spacingY={{ base: 8, md: 0 }} spacingX={{ md: 8, lg: 14 }}>
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <MetaInputs />
          </GridItem>
          <GridItem colSpan={{ base: 2, lg: 1 }}>
            <ContactPersonInputs />
          </GridItem>
        </SimpleGrid>
      </VStack>
    </CreateEnterpriseForm>
  );
};

export { EditEnterpriseForm };

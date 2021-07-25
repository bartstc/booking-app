import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Divider, HStack, VStack } from '@chakra-ui/react';

import { SectionHeader, SectionSubtitle, SectionTitle } from 'shared/ReadMode';
import { SubmitButton } from 'shared/Form';

import { useCreateOwnerEmployee } from 'modules/employees/infrastructure/command';
import { useAddEmployeeNotification } from 'modules/employees/presentation/AddEmployeeForm';
import { CreateOwnerEmployeeForm } from 'modules/employees/presentation';

interface IProps {
  enterpriseId: string;
  ownerEmail: string;
}

const CreateEmployee = ({ ownerEmail, enterpriseId }: IProps) => {
  const [handler, isLoading] = useCreateOwnerEmployee(enterpriseId, ownerEmail);
  const { showSuccessNotification, showFailureNotification } = useAddEmployeeNotification();

  return (
    <VStack spacing={8} py={16} display='stretch' m='0 auto' maxW='800px'>
      <VStack>
        <SectionHeader spacing={3}>
          <SectionTitle fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
            <FormattedMessage id='register-employee' defaultMessage='Tell us who you are' />
          </SectionTitle>
          <SectionSubtitle>
            <FormattedMessage
              id='register-employee-info'
              defaultMessage='By providing data below we will create your own profile which allows you manage your business.'
            />
          </SectionSubtitle>
        </SectionHeader>
      </VStack>
      <Divider />
      <CreateOwnerEmployeeForm
        onSubmit={async model => {
          try {
            await handler(model);
            showSuccessNotification();
          } catch (e) {
            showFailureNotification();
          }
        }}
      />
      <HStack justify='flex-end'>
        <SubmitButton form='create-employee-form' size='lg' isLoading={isLoading} />
      </HStack>
    </VStack>
  );
};

export { CreateEmployee };

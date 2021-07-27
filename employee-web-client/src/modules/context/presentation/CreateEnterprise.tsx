import React from 'react';
import { FormattedMessage } from 'react-intl';
import { VStack, Divider } from '@chakra-ui/react';

import { SectionHeader, SectionSubtitle, SectionTitle } from 'shared/ReadMode';

import { CreateEnterpriseForm } from 'modules/enterprise/presentation';

interface IProps {
  ownerId: string;
}

const CreateEnterprise = ({ ownerId }: IProps) => {
  return (
    <VStack spacing={8} py={16} display='stretch' m='0 auto' maxW='800px'>
      <VStack>
        <SectionHeader spacing={3}>
          <SectionTitle fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
            <FormattedMessage id='register-enterprise' defaultMessage='Register your business' />
          </SectionTitle>
          <SectionSubtitle>
            <FormattedMessage
              id='register-enterprise-info'
              defaultMessage='We are very happy that you joined us! You are only a few steps away from using our platform. You only need to provide us with basic information about your business. You will only have to fill in this data, so we only ask for a moment of patience.'
            />
          </SectionSubtitle>
        </SectionHeader>
      </VStack>
      <Divider />
      <CreateEnterpriseForm ownerId={ownerId} />
    </VStack>
  );
};

export { CreateEnterprise };

import React from 'react';
import { SimpleGrid, GridItem, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { useEnterpriseConsumer } from 'modules/context';
import { ReadModeValue, SectionTitle } from 'shared/ReadMode';

const EnterpriseBody = () => {
  const enterprise = useEnterpriseConsumer();

  return (
    <SimpleGrid columns={3} spacingY={{ base: 8, md: 0 }} spacingX={{ md: 8, lg: 14 }}>
      <GridItem colSpan={{ base: 3, lg: 2 }}>
        <SectionTitle>
          <FormattedMessage id='enterprise-base-data' defaultMessage='Base enterprise data' />
        </SectionTitle>
        <VStack spacing={4} align='flex-start'>
          <ReadModeValue
            value={enterprise.enterpriseName}
            label={<FormattedMessage id='enterprise-name' defaultMessage='Enterprise name' />}
          />
          <ReadModeValue
            value={enterprise.enterpriseDescription}
            label={<FormattedMessage id='description' defaultMessage='Description' />}
          />
          <ReadModeValue
            value={enterprise.enterpriseUrl}
            label={<FormattedMessage id='enterprise-url' defaultMessage='Website url address' />}
          />
        </VStack>
      </GridItem>
      <GridItem colSpan={{ base: 3, lg: 1 }}>
        <SectionTitle>
          <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
        </SectionTitle>
        <VStack spacing={4} align='flex-start'>
          <ReadModeValue value={enterprise.contactPerson.name} label={<FormattedMessage id='name' defaultMessage='Name' />} />
          <ReadModeValue
            value={enterprise.contactPerson.phone}
            label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />}
          />
          <ReadModeValue value={enterprise.contactPerson.fax} label={<FormattedMessage id='fax-number' defaultMessage='Fax' />} />
          <ReadModeValue
            value={enterprise.contactPerson.email}
            label={<FormattedMessage id='email-address' defaultMessage='Email address' />}
          />
        </VStack>
      </GridItem>
    </SimpleGrid>
  );
};

export { EnterpriseBody };

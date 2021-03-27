import React from 'react';
import { Heading, useColorModeValue, SimpleGrid, GridItem, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { useEnterpriseConsumer } from 'modules/context';
import { ReadModeValue } from 'shared/ReadMode';

const EnterpriseData = () => {
  const enterprise = useEnterpriseConsumer();
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <SimpleGrid columns={2} spacingY={{ base: 8, md: 0 }} spacingX={{ md: 8, lg: 14 }}>
      <GridItem spacing={4} as={VStack} align='flex-start' colSpan={{ base: 2, md: 1 }}>
        <Heading color={color} as='h3' fontSize='xl'>
          <FormattedMessage id='enterprise-base-data' defaultMessage='Base enterprise data' />
        </Heading>
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
        <ReadModeValue value={enterprise.countryCode} label={<FormattedMessage id='country-code' defaultMessage='Country code' />} />
      </GridItem>
      <GridItem spacing={4} as={VStack} align='flex-start' colSpan={{ base: 2, md: 1 }}>
        <Heading color={color} as='h3' fontSize='xl'>
          <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
        </Heading>
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
      </GridItem>
    </SimpleGrid>
  );
};

export { EnterpriseData };

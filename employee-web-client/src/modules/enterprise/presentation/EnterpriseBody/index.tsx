import React from 'react';
import { GridItem, VStack, Divider } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { useEnterpriseConsumer } from 'modules/context';
import { ReadModeValue, SectionTitle, SectionHeader, SectionSubtitle, SectionContainer, SectionGrid } from 'shared/ReadMode';

const EnterpriseBody = () => {
  const enterprise = useEnterpriseConsumer();

  return (
    <SectionContainer>
      <SectionGrid>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='enterprise-base-data' defaultMessage='Base information' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage id='enterprise-base-data-description' defaultMessage='Base data about enterprise.' />
            </SectionSubtitle>
          </SectionHeader>
        </GridItem>
        <GridItem colSpan={{ base: 3, lg: 2 }}>
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
      </SectionGrid>
      <Divider />
      <SectionGrid>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage
                id='contact-person-description-info'
                defaultMessage='Data of the person who can be contacted by the booking service administrator.'
              />
            </SectionSubtitle>
          </SectionHeader>
        </GridItem>
        <GridItem colSpan={{ base: 3, lg: 2 }}>
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
      </SectionGrid>
    </SectionContainer>
  );
};

export { EnterpriseBody };

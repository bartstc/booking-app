import React from 'react';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { ContactPersonFields } from 'shared/Form/Implementations';
import { SectionTitle, SectionHeader, SectionSubtitle, SectionGrid } from 'shared/ReadMode';

const ContactPersonInputs = () => {
  return (
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
      <GridItem as={SimpleGrid} columns={4} spacingX={4} colSpan={{ base: 3, lg: 2 }}>
        <ContactPersonFields />
      </GridItem>
    </SectionGrid>
  );
};

export { ContactPersonInputs };

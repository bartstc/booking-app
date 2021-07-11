import React from 'react';
import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SectionGrid, SectionHeader, SectionSubtitle, SectionTitle } from 'shared/ReadMode';
import { ContactPersonFields } from 'shared/Form/Implementations';

const ContactPersonInputs = () => {
  return (
    <SectionGrid>
      <GridItem colSpan={{ base: 3, lg: 1 }}>
        <SectionHeader>
          <SectionTitle>
            <FormattedMessage id='facility-contact-person' defaultMessage='Contact person' />
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

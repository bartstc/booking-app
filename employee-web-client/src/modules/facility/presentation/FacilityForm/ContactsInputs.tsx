import React from 'react';
import { GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SectionTitle, SectionGrid, SectionSubtitle } from 'shared/ReadMode';
import { ContactsFields } from 'shared/Form/Implementations';

const ContactsInputs = () => {
  return (
    <SectionGrid>
      <GridItem colSpan={{ base: 3, lg: 1 }}>
        <SectionTitle>
          <FormattedMessage id='contact' defaultMessage='Contact' />
        </SectionTitle>
        <SectionSubtitle>
          <FormattedMessage
            id='facility-contact-description'
            defaultMessage='The contact list necessary for communication between the facility and its customers.'
          />
        </SectionSubtitle>
      </GridItem>
      <GridItem colSpan={{ base: 3, lg: 2 }}>
        <ContactsFields />
      </GridItem>
    </SectionGrid>
  );
};

export { ContactsInputs };

import React from 'react';
import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SectionTitle } from 'shared/ReadMode';
import { ContactPersonFields } from 'shared/Form/Implementations';

const ContactPersonInputs = () => {
  return (
    <SimpleGrid w='100%' columns={4} spacingX={4}>
      <GridItem colSpan={4}>
        <SectionTitle
          description={
            <FormattedMessage
              id='contact-person-description-info'
              defaultMessage='Data of the person who can be contacted by the booking service administrator.'
            />
          }
        >
          <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
        </SectionTitle>
      </GridItem>
      <ContactPersonFields />
    </SimpleGrid>
  );
};

export { ContactPersonInputs };

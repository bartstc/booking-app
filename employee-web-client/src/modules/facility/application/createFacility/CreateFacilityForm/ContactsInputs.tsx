import React from 'react';
import { GridItem, Box } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SectionTitle } from 'shared/ReadMode';
import { ContactsFields } from 'shared/Form/Implementations';

const ContactsInputs = () => {
  return (
    <Box w='100%' mb={3}>
      <ContactsFields>
        <GridItem colSpan={12}>
          <SectionTitle>
            <FormattedMessage id='Contact' defaultMessage='Contact' />
          </SectionTitle>
        </GridItem>
      </ContactsFields>
    </Box>
  );
};

export { ContactsInputs };

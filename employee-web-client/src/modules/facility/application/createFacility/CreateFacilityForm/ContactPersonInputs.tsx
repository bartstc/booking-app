import React from 'react';
import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { SectionTitle } from 'shared/ReadMode';
import { ContactPersonFields } from 'shared/Form/Implementations';

const ContactPersonInputs = () => {
  return (
    <SimpleGrid w='100%' columns={4} spacingX={4}>
      <GridItem colSpan={4}>
        <SectionTitle>
          <FormattedMessage id='facility-contact-person' defaultMessage='Contact person' />
        </SectionTitle>
      </GridItem>
      <ContactPersonFields required={false} />
    </SimpleGrid>
  );
};

export { ContactPersonInputs };

import React from 'react';
import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { InputField } from 'react-hook-form-chakra-fields';

import { SectionTitle } from 'shared/ReadMode';

const MetaInputs = () => {
  return (
    <SimpleGrid w='100%' columns={4} spacingX={4}>
      <GridItem colSpan={4}>
        <SectionTitle>
          <FormattedMessage id='enterprise-base-data' defaultMessage='Base enterprise data' />
        </SectionTitle>
      </GridItem>
      <InputField
        name='enterpriseName'
        label={<FormattedMessage id='enterprise-name' defaultMessage='Enterprise name' />}
        id='enterprise-name'
        colSpan={{ base: 4, md: 3 }}
      />
      <InputField
        name='enterpriseDescription'
        as='textarea'
        label={<FormattedMessage id='description' defaultMessage='Description' />}
        id='enterprise-description'
        colSpan={4}
      />
      <InputField
        name='enterpriseUrl'
        label={<FormattedMessage id='enterprise-url' defaultMessage='Website url address' />}
        id='enterprise-url'
        colSpan={{ base: 4, md: 3 }}
      />
    </SimpleGrid>
  );
};

export { MetaInputs };

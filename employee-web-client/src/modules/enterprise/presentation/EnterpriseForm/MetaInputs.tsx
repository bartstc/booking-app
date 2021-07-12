import React from 'react';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { InputField } from 'react-hook-form-chakra-fields';

import { SectionTitle, SectionHeader, SectionSubtitle, SectionGrid } from 'shared/ReadMode';

const MetaInputs = () => {
  return (
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
      <GridItem as={SimpleGrid} spacingX={4} columns={4} colSpan={{ base: 3, lg: 2 }}>
        <InputField
          name='enterpriseName'
          label={<FormattedMessage id='enterprise-name' defaultMessage='Enterprise name' />}
          id='enterprise-name'
          colSpan={{ base: 4, md: 2 }}
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
          colSpan={{ base: 4, md: 2 }}
        />
      </GridItem>
    </SectionGrid>
  );
};

export { MetaInputs };

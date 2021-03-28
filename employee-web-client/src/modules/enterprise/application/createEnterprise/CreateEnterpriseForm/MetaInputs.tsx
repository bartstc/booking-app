import React from 'react';
import { useColorModeValue, SimpleGrid, GridItem, Heading } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { InputField } from 'react-hook-form-chakra-fields';

const MetaInputs = () => {
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <SimpleGrid w='100%' columns={4} spacingX={4}>
      <GridItem colSpan={4}>
        <Heading color={color} as='h3' fontSize='xl' mb={3}>
          <FormattedMessage id='enterprise-base-data' defaultMessage='Base enterprise data' />
        </Heading>
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
      <InputField
        name='countryCode'
        label={<FormattedMessage id='country-code' defaultMessage='Country code' />}
        id='enterprise-country-code'
        tip={
          <FormattedMessage
            id='country-code-tip'
            defaultMessage='One of ISO codes as described in the ISO 3166 international standard.
Type 2 letter code of your country name (Alpha-2 code).'
          />
        }
        colSpan={2}
      />
    </SimpleGrid>
  );
};

export { MetaInputs };

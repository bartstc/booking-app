import React from 'react';
import { Box, VStack, Heading, useColorModeValue } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { InputField } from 'shared/Form';

const MetaInputs = () => {
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <VStack w='100%' align='flex-start'>
      <Heading color={color} as='h3' fontSize='2xl' mb={2}>
        <FormattedMessage id='enterprise-base-data' defaultMessage='Base enterprise data' />
      </Heading>
      <Box w='100%' maxW='450px'>
        <InputField
          name='enterpriseName'
          label={<FormattedMessage id='enterprise-name' defaultMessage='Enterprise name' />}
          id='enterprise-name'
        />
      </Box>
      <Box w='100%'>
        <InputField
          name='enterpriseDescription'
          as='textarea'
          label={<FormattedMessage id='description' defaultMessage='Description' />}
          id='enterprise-description'
        />
      </Box>
      <Box w='100%' maxW='400px'>
        <InputField
          name='enterpriseUrl'
          label={<FormattedMessage id='enterprise-url' defaultMessage='Website url address' />}
          id='enterprise-url'
        />
      </Box>
      <Box w='100%' maxW='200px'>
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
        />
      </Box>
    </VStack>
  );
};

export { MetaInputs };

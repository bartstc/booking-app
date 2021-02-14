import React from 'react';
import { Box, Heading, useColorModeValue, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { InputField, MaskedInputField, masks } from 'shared/Form';

const ContactPersonInputs = () => {
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <VStack w='100%' align='flex-start'>
      <Heading color={color} as='h3' fontSize='2xl' mb={2}>
        <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
      </Heading>
      <Box w='100%' maxW='450px'>
        <InputField name='contactPerson.name' label={<FormattedMessage id='name' defaultMessage='Name' />} id='contact-person-name' />
        <MaskedInputField
          label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />}
          name='contactPerson.phone'
          id='contact-person-phone'
          guide
          mask={masks.phone}
        />
        <MaskedInputField
          label={<FormattedMessage id='fax-number' defaultMessage='Fax' />}
          required={false}
          name='contactPerson.fax'
          id='contact-person-fax'
          guide
          mask={masks.phone}
        />
        <InputField
          name='contactPerson.email'
          label={<FormattedMessage id='email-address' defaultMessage='Email address' />}
          id='contact-person-email'
        />
      </Box>
    </VStack>
  );
};

export { ContactPersonInputs };

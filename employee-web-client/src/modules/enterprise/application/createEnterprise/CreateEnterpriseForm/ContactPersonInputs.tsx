import React from 'react';
import { SimpleGrid, useColorModeValue, GridItem, Heading } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { InputField, MaskedInputField } from 'react-hook-form-chakra-fields';

import { masks } from 'shared/Form';

const ContactPersonInputs = () => {
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <SimpleGrid w='100%' columns={4} spacingX={4}>
      <GridItem colSpan={4}>
        <Heading color={color} as='h3' fontSize='xl' mb={3}>
          <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
        </Heading>
      </GridItem>
      <InputField
        colSpan={4}
        name='contactPerson.name'
        label={<FormattedMessage id='name' defaultMessage='Name' />}
        id='contact-person-name'
      />
      <MaskedInputField
        label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />}
        name='contactPerson.phone'
        id='contact-person-phone'
        guide
        mask={masks.phone}
        colSpan={{ base: 4, md: 3 }}
      />
      <MaskedInputField
        label={<FormattedMessage id='fax-number' defaultMessage='Fax' />}
        required={false}
        name='contactPerson.fax'
        id='contact-person-fax'
        guide
        mask={masks.phone}
        colSpan={{ base: 4, md: 3 }}
      />
      <InputField
        name='contactPerson.email'
        label={<FormattedMessage id='email-address' defaultMessage='Email address' />}
        id='contact-person-email'
        colSpan={{ base: 4, md: 3 }}
      />
    </SimpleGrid>
  );
};

export { ContactPersonInputs };

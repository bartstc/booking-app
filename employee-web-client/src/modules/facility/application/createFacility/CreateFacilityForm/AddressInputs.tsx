import React from 'react';
import { GridItem, SimpleGrid } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { InputField, MaskedInputField } from 'react-hook-form-chakra-fields';

import { SectionTitle } from 'shared/ReadMode';
import { masks } from 'shared/Form/Builders';

const AddressInputs = () => {
  return (
    <SimpleGrid w='100%' columns={12} spacingX={4}>
      <GridItem colSpan={12}>
        <SectionTitle>
          <FormattedMessage id='address' defaultMessage='Address' />
        </SectionTitle>
      </GridItem>
      <MaskedInputField
        name='address.countryCode'
        label={<FormattedMessage id='country-code' defaultMessage='Country code' />}
        id='facility-country-code'
        tip={
          <FormattedMessage
            id='country-code-tip'
            defaultMessage='One of ISO codes as described in the ISO 3166 international standard.
Type 2 letter code of your country name (Alpha-2 code).'
          />
        }
        mask={masks.countryCode}
        colSpan={{ base: 6, md: 4 }}
      />
      <InputField
        name='address.province'
        label={<FormattedMessage id='province' defaultMessage='Province' />}
        id='facility-province'
        colSpan={{ base: 12, md: 8 }}
        required={false}
      />
      <MaskedInputField
        name='address.postCode'
        label={<FormattedMessage id='post-code' defaultMessage='Post code' />}
        id='facility-post-code'
        colSpan={{ base: 12, md: 4 }}
        mask={masks.postCode}
      />
      <InputField
        name='address.city'
        label={<FormattedMessage id='city' defaultMessage='City' />}
        id='facility-city'
        colSpan={{ base: 12, md: 8 }}
      />
      <InputField
        name='address.street'
        label={<FormattedMessage id='street' defaultMessage='Street' />}
        id='facility-street'
        colSpan={{ base: 12, md: 10, lg: 8 }}
      />
    </SimpleGrid>
  );
};

export { AddressInputs };

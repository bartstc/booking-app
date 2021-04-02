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
      <InputField
        name='address.province'
        label={<FormattedMessage id='province' defaultMessage='Province' />}
        id='facility-province'
        colSpan={{ base: 12, md: 8 }}
        required={false}
      />
      <GridItem display={{ base: 'none', md: 'block' }} colSpan={4}></GridItem>
      <MaskedInputField
        name='address.postCode'
        label={<FormattedMessage id='post-code' defaultMessage='Post code' />}
        id='facility-post-code'
        colSpan={{ base: 8, md: 4 }}
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

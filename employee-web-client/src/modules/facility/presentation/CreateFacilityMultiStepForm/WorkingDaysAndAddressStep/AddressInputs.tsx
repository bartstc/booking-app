import React from 'react';
import { useIntl } from 'react-intl';

import { MaskedTextInput, TextInput } from 'shared/FormV2';
import { masks } from 'shared/Form';

const AddressInputs = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <TextInput name='address.province' colSpan={{ base: 6, md: 4 }}>
        {formatMessage({ id: 'province', defaultMessage: 'Province' })}
      </TextInput>
      <MaskedTextInput name='address.postCode' mask={masks.postCode} colSpan={{ base: 4, md: 3 }} colStart={1} isRequired>
        {formatMessage({ id: 'post-code', defaultMessage: 'Post code' })}
      </MaskedTextInput>
      <TextInput name='address.city' colSpan={{ base: 6, md: 3 }} isRequired>
        {formatMessage({ id: 'city', defaultMessage: 'City' })}
      </TextInput>
      <TextInput name='address.street' colSpan={{ base: 6, md: 4 }} isRequired>
        {formatMessage({ id: 'street', defaultMessage: 'Street' })}
      </TextInput>
    </>
  );
};

export { AddressInputs };

import React from 'react';
import { useIntl } from 'react-intl';

import { EmailInput, MaskedTextInput, TextInput } from 'shared/FormV2';
import { masks } from 'shared/Form';

const ContactPersonInputs = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <TextInput name='contactPerson.name' colSpan={{ base: 6, md: 4 }} isRequired>
        {formatMessage({ id: 'name', defaultMessage: 'Name' })}
      </TextInput>
      <MaskedTextInput name='contactPerson.phone' mask={masks.phone} colSpan={{ base: 6, md: 4 }} colStart={1} isRequired>
        {formatMessage({ id: 'phone-number', defaultMessage: 'Phone number' })}
      </MaskedTextInput>
      <MaskedTextInput name='contactPerson.fax' mask={masks.phone} colSpan={{ base: 6, md: 4 }} colStart={1} isRequired>
        {formatMessage({ id: 'fax-number', defaultMessage: 'Fax number' })}
      </MaskedTextInput>
      <EmailInput name='contactPerson.email' colSpan={{ base: 6, md: 4 }} isRequired>
        {formatMessage({ id: 'contact-email-label', defaultMessage: 'Contact email' })}
      </EmailInput>
    </>
  );
};

export { ContactPersonInputs };

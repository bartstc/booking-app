import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HStack, VStack, Stack, chakra } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';

import { ContactType } from 'types';

import { ContactSelectField } from 'shared/Form/Implementations';
import { InputField, MaskedInputField, masks } from 'shared/Form';
import { Button, IconButton } from 'shared/Button';

const ContactsFields = () => {
  const { formatMessage } = useIntl();
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'contacts' });

  return (
    <VStack w='100%'>
      {fields.map((field, index) => (
        <Stack spacing={4} w='100%' key={field.id} direction={{ base: 'column', md: 'row' }} align='flex-start'>
          <chakra.div w='100%' maxW={{ base: '100%', md: '200px' }}>
            <ContactSelectField
              name={`contacts[${index}].type`}
              id={`contacts[${index}].type`}
              label={<FormattedMessage id='contact-type' defaultMessage='Type' />}
              defaultValue={field.type}
            />
          </chakra.div>
          <HStack width='100%' align='flex-start' spacing={4}>
            {field.type === ContactType.Phone || field.type === ContactType.Fax ? (
              <MaskedInputField
                label={<FormattedMessage id='contact' defaultMessage='Contact' />}
                name={`contacts[${index}].value`}
                id={`contacts[${index}].value`}
                guide
                mask={masks.phone}
              />
            ) : (
              <InputField
                name={`contacts[${index}].value`}
                label={<FormattedMessage id='contact' defaultMessage='Contact' />}
                id={`contacts[${index}].value`}
              />
            )}
            <IconButton
              title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
              colorScheme='red'
              path={mdiDelete}
              onClick={() => remove(index)}
              mt='32px !important'
            />
          </HStack>
        </Stack>
      ))}
      <Button colorScheme='blue' onClick={() => append({ type: '', value: '' })}>
        <FormattedMessage id='add-contact' defaultMessage='Add contact' />
      </Button>
    </VStack>
  );
};

export { ContactsFields };

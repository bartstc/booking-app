import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { HStack, VStack, Stack, chakra } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';

import { ContactType } from 'types';

import { ContactSelectField } from 'shared/Form/Implementations';
import { InputField, MaskedInputField, masks } from 'shared/Form';
import { Button, IconButton } from 'shared/Button';

interface IProps {
  namePrefix?: string;
}

const ContactsFields = ({ namePrefix = 'contacts' }: IProps) => {
  const { formatMessage } = useIntl();
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: namePrefix });

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const typeName = `${namePrefix}[${index}].type`;
        const valueName = `${namePrefix}[${index}].value`;
        const isFirst = index === 0;

        return (
          <Stack spacing={4} w='100%' key={field.id} direction={{ base: 'column', md: 'row' }} align='flex-start'>
            <chakra.div w='100%' maxW={{ base: '100%', md: '200px' }}>
              <ContactSelectField
                name={typeName}
                id={typeName}
                label={<FormattedMessage id='contact-type' defaultMessage='Type' />}
                defaultValue={isFirst ? ContactType.Phone : field.type}
                onChangeEffect={() => setValue(valueName, '')}
                disabled={isFirst}
              />
            </chakra.div>
            <HStack width='100%' align='flex-start' spacing={4}>
              {watch(typeName) === ContactType.Phone || watch(typeName) === ContactType.Fax ? (
                <MaskedInputField
                  label={<FormattedMessage id='contact' defaultMessage='Contact' />}
                  name={valueName}
                  id={valueName}
                  mask={masks.phone}
                  disabled={!watch(typeName)}
                />
              ) : (
                <InputField
                  name={valueName}
                  label={<FormattedMessage id='contact' defaultMessage='Contact' />}
                  id={valueName}
                  disabled={!watch(typeName)}
                />
              )}
              {!isFirst && (
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='32px !important'
                />
              )}
            </HStack>
          </Stack>
        );
      })}
      <Button colorScheme='blue' onClick={() => append({ type: '', value: '' })}>
        <FormattedMessage id='add-contact' defaultMessage='Add contact' />
      </Button>
    </VStack>
  );
};

export { ContactsFields };

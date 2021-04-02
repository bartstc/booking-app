import React, { ReactNode } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { VStack, Box, SimpleGrid, GridItem } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';
import { InputField, MaskedInputField } from 'react-hook-form-chakra-fields';

import { ContactType } from 'types';

import { ContactSelectField } from 'shared/Form/Implementations';
import { masks } from 'shared/Form';
import { Button, IconButton } from 'shared/Button';

interface IProps {
  namePrefix?: string;
  children?: ReactNode;
}

const ContactsFields = ({ namePrefix = 'contacts', children }: IProps) => {
  const { formatMessage } = useIntl();
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: namePrefix });

  return (
    <VStack w='100%' align='stretch'>
      {fields.map((field, index) => {
        const typeName = `${namePrefix}[${index}].type`;
        const valueName = `${namePrefix}[${index}].value`;
        const isFirst = index === 0;

        return (
          <SimpleGrid key={field.id} columns={12} spacingX={4}>
            {children}
            <ContactSelectField
              name={typeName}
              id={typeName}
              label={<FormattedMessage id='contact-type' defaultMessage='Type' />}
              defaultValue={isFirst ? ContactType.Phone : field.type}
              onChangeEffect={() => setValue(valueName, '')}
              disabled={isFirst}
              colSpan={{ base: 12, md: 4 }}
            />
            {watch(typeName) === ContactType.Phone || watch(typeName) === ContactType.Fax ? (
              <MaskedInputField
                label={<FormattedMessage id='contact' defaultMessage='Contact' />}
                name={valueName}
                id={valueName}
                mask={masks.phone}
                disabled={!watch(typeName)}
                colSpan={{ base: isFirst ? 12 : 10, md: 6 }}
              />
            ) : (
              <InputField
                name={valueName}
                label={<FormattedMessage id='contact' defaultMessage='Contact' />}
                id={valueName}
                disabled={!watch(typeName)}
                colSpan={{ base: isFirst ? 12 : 10, md: 6 }}
              />
            )}
            {!isFirst && (
              <GridItem colSpan={2}>
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='32px !important'
                />
              </GridItem>
            )}
          </SimpleGrid>
        );
      })}
      <Box>
        <Button colorScheme='blue' onClick={() => append({ type: '', value: '' })}>
          <FormattedMessage id='add-contact' defaultMessage='Add contact' />
        </Button>
      </Box>
    </VStack>
  );
};

export { ContactsFields };

import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Box, GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import { mdiDelete } from '@mdi/js';

import { ContactType } from 'types';

import { Button, IconButton } from '../../Button';
import { ContactTypeInput } from './ContactTypeInput';
import { useFormContextSelector } from '../FormProvider';
import { PhoneInput } from './PhoneInput';
import { UrlInput } from './UrlInput';
import { EmailInput } from './EmailInput';

interface IProps {
  prefix?: string;
}

const ContactInputs = ({ prefix = 'contacts' }: IProps) => {
  const { formatMessage } = useIntl();

  const control = useFormContextSelector(state => state.control);
  const watch = useFormContextSelector(state => state.watch);
  const { fields, append, remove } = useFieldArray({ control, name: prefix });

  return (
    <GridItem colStart={1} colEnd={-1} as={VStack} spacing={4} align='stretch'>
      {fields.map((field, index) => {
        const typeName = `${prefix}[${index}].type`;
        const valueName = `${prefix}[${index}].value`;
        const isFirst = index === 0;

        return (
          <SimpleGrid key={field.id} columns={12} spacingX={4} spacingY={6}>
            <ContactTypeInput
              name={typeName}
              defaultValue={isFirst ? ContactType.Phone : field.type}
              isDisabled={isFirst}
              colSpan={{ base: 12, md: 4 }}
              isRequired
            />
            {(watch(typeName) === ContactType.Phone || watch(typeName) === ContactType.Fax) && (
              <PhoneInput name={valueName} isDisabled={!watch(typeName)} colSpan={{ base: isFirst ? 12 : 10, md: 6 }} isRequired />
            )}
            {watch(typeName) === ContactType.Url && (
              <UrlInput name={valueName} isDisabled={!watch(typeName)} colSpan={{ base: isFirst ? 12 : 10, md: 6 }} isRequired />
            )}
            {watch(typeName) === ContactType.Email && (
              <EmailInput name={valueName} isDisabled={!watch(typeName)} colSpan={{ base: isFirst ? 12 : 10, md: 6 }} isRequired />
            )}
            {!isFirst && (
              <GridItem colSpan={2}>
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='30px !important'
                />
              </GridItem>
            )}
          </SimpleGrid>
        );
      })}
      <Box>
        <Button colorScheme='blue' onClick={() => append({ type: '', value: '' })}>
          {formatMessage({ id: 'add-contact', defaultMessage: 'Add contact' })}
        </Button>
      </Box>
    </GridItem>
  );
};

export { ContactInputs };

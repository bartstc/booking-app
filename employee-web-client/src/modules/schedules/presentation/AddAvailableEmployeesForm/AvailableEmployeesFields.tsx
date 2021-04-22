import React from 'react';
import { DateTimeOnlyField } from 'react-hook-form-chakra-fields';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray } from 'react-hook-form';
import { GridItem, SimpleGrid, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';
import { mdiDelete } from '@mdi/js';

import { Button, IconButton } from 'shared/Button';

interface IProps {
  date: string;
}

const AvailableEmployeesFields = ({ date }: IProps) => {
  const { formatMessage } = useIntl();
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);

  const { fields, append, remove } = useFieldArray({ name: 'availabilities' });

  if (fields.length === 0) {
    append({
      endTime: '',
      startTime: '',
    });
  }

  return (
    <VStack w='100%' align='flex-start'>
      {fields.map((field, index) => {
        const isFirst = index === 0;

        return (
          <VStack borderTop={`1px solid ${borderColor}`} spacing={1} w='100%' key={field.id} align='stretch'>
            <SimpleGrid mt={3} columns={10} spacingX={2}>
              <DateTimeOnlyField
                initDate={date}
                name={`availabilities[${index}].startTime`}
                id={`availabilities[${index}]-startTime`}
                label={<FormattedMessage id='start-time' defaultMessage='Start time' />}
                colSpan={4}
              />
              <DateTimeOnlyField
                initDate={date}
                name={`availabilities[${index}].endTime`}
                id={`availabilities[${index}]-endTime`}
                label={<FormattedMessage id='end-time' defaultMessage='End time' />}
                colSpan={4}
              />
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
          </VStack>
        );
      })}
      <Button
        colorScheme='blue'
        size='sm'
        onClick={() =>
          append({
            endTime: '',
            startTime: '',
          })
        }
      >
        <FormattedMessage id='add-time' defaultMessage='Add time' />
      </Button>
    </VStack>
  );
};

export { AvailableEmployeesFields };

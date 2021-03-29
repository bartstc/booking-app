import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { VStack, Box, SimpleGrid, GridItem } from '@chakra-ui/react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';
import { SelectField, MaskedInputField, OptionType } from 'react-hook-form-chakra-fields';

import { masks } from 'shared/Form';
import { Button, IconButton } from 'shared/Button';
import { SectionTitle } from 'shared/ReadMode';

import { WeekDay } from '../../../types';
import { weekDayMessages } from '../../../messages';

const WorkingHoursInputs = () => {
  const { formatMessage } = useIntl();
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'availability' });

  const selectedWeekDays = (watch('availability') as { dayName: WeekDay }[]).map(day => day.dayName);
  const weekDayOptions: OptionType[] = Object.values(WeekDay)
    .filter(weekDay => !selectedWeekDays.includes(weekDay))
    .map(weekDay => ({
      value: weekDay,
      label: formatMessage(weekDayMessages[weekDay]),
    }));

  return (
    <VStack w='100%' align='stretch'>
      <SectionTitle>
        <FormattedMessage id='working-hours' defaultMessage='Working hours' />
      </SectionTitle>
      {fields.map((field, index) => {
        const dayName = `availability[${index}].dayName`;
        const untilHourName = `availability[${index}].hours.until`;
        const toHourName = `availability[${index}].hours.to`;
        const isFirst = index === 0;

        return (
          <SimpleGrid key={field.id} columns={12} spacingX={4}>
            <SelectField
              name={dayName}
              id={dayName}
              label={<FormattedMessage id='week-day' defaultMessage='Week day' />}
              options={weekDayOptions}
              colSpan={{ base: 10, md: 4 }}
            />
            {!isFirst && (
              <GridItem display={{ base: 'block', md: 'none' }} colSpan={2}>
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='32px !important'
                />
              </GridItem>
            )}
            <MaskedInputField
              label={<FormattedMessage id='hour-until' defaultMessage='Hour until' />}
              name={untilHourName}
              id={untilHourName}
              mask={masks.hour}
              disabled={!watch(dayName)}
              colSpan={{ base: 6, md: 3 }}
            />
            <MaskedInputField
              label={<FormattedMessage id='hour-to' defaultMessage='Hour to' />}
              name={toHourName}
              id={toHourName}
              mask={masks.hour}
              disabled={!watch(dayName)}
              colSpan={{ base: 6, md: 3 }}
            />
            {!isFirst && (
              <GridItem display={{ base: 'none', md: 'block' }} colSpan={2}>
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
      {selectedWeekDays.length !== 7 && (
        <Box>
          <Button colorScheme='blue' onClick={() => append({ dayName: '', hours: { until: '', to: '' } })}>
            <FormattedMessage id='add-another-day' defaultMessage='Add another day' />
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export { WorkingHoursInputs };

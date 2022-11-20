import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useFieldArray } from 'react-hook-form';
import { mdiDelete } from '@mdi/js';
import { GridItem } from '@chakra-ui/react';

import { OptionType } from 'shared/FormV2/presentation/Select';
import { MaskedTextInput, Select, useFormContextSelector } from 'shared/FormV2';
import { Button, IconButton } from 'shared/Button';
import { masks } from 'shared/Form';

import { WeekDay } from '../../../application/types';
import { weekDayMessages } from '../../../application/messages';

const WorkingHoursInputs = () => {
  const { formatMessage } = useIntl();
  const control = useFormContextSelector(state => state.control);
  const watch = useFormContextSelector(state => state.watch);
  const { fields, append, remove } = useFieldArray({ control, name: 'availability' });

  const selectedWeekDays = (watch('availability') as { dayName: WeekDay }[]).map(day => day.dayName);
  const weekDayOptions: OptionType<string>[] = Object.values(WeekDay).map(weekDay => ({
    value: weekDay,
    label: formatMessage(weekDayMessages[weekDay]),
  }));

  return (
    <>
      {fields.map((field, index) => {
        const dayName = `availability[${index}].dayName`;
        const untilHourName = `availability[${index}].hours.until`;
        const toHourName = `availability[${index}].hours.to`;
        const isFirst = index === 0;

        return (
          <>
            <Select options={weekDayOptions} name={dayName} colSpan={{ base: 10, md: 4 }} isRequired>
              {formatMessage({ id: 'week-day', defaultMessage: 'Week day' })}
            </Select>
            {!isFirst && (
              <GridItem display={{ base: 'block', md: 'none' }} colSpan={2}>
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='30px !important'
                />
              </GridItem>
            )}
            <MaskedTextInput name={untilHourName} mask={masks.hour} colSpan={{ base: 6, md: 3 }} isRequired>
              {formatMessage({ id: 'hour-until', defaultMessage: 'Hour until' })}
            </MaskedTextInput>
            <MaskedTextInput name={toHourName} mask={masks.hour} colSpan={{ base: 6, md: 3 }} isRequired>
              {formatMessage({ id: 'hour-to', defaultMessage: 'Hour to' })}
            </MaskedTextInput>
            {!isFirst && (
              <GridItem display={{ base: 'none', md: 'block' }} colSpan={2}>
                <IconButton
                  title={formatMessage({ id: 'remove', defaultMessage: 'Remove' })}
                  colorScheme='red'
                  path={mdiDelete}
                  onClick={() => remove(index)}
                  mt='30px !important'
                />
              </GridItem>
            )}
          </>
        );
      })}
      {selectedWeekDays.length !== 7 && (
        <GridItem colSpan={12}>
          <Button colorScheme='blue' onClick={() => append({ dayName: '', hours: { until: '', to: '' } })}>
            <FormattedMessage id='add-another-day' defaultMessage='Add another day' />
          </Button>
        </GridItem>
      )}
    </>
  );
};

export { WorkingHoursInputs };

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { HStack, Box } from '@chakra-ui/react';

import { DateInput, DateInputProps } from '../DateInput';
import { TimeInput } from '../TimeInput';

export type DateTimeInputProps = Omit<DateInputProps, 'onChange' | 'value'> & {
  onChange?: (dateTime: string | null) => void;
  value?: string | null;
};

const DateTimeInput = ({ id, value = null, onChange, ...props }: DateTimeInputProps) => {
  const valueToString = (val: number) => val.toString().padStart(2, '0');

  const getTime = () => {
    const date = dayjs(value ?? undefined);
    if (date.isValid()) {
      return `${valueToString(date.hour())}:${valueToString(date.minute())}`;
    }
    return null;
  };

  const insertTimeToDate = (date: string, time: string) => {
    const [hour, minute] = time.split(':');
    return dayjs(date).hour(Number(hour)).minute(Number(minute)).format('YYYY-MM-DDTHH:mm:ssZ');
  };

  const [dateValue, setDateValue] = useState(value);
  const [timeValue, setTimeValue] = useState(getTime());
  const [dateTimeValue, setDateTimeValue] = useState(value);

  useEffect(() => {
    if (onChange) {
      onChange(dateTimeValue);
    }
  }, [dateTimeValue, onChange]);

  const removeDate = () => {
    setDateValue(null);
    setTimeValue(null);
    setDateTimeValue(null);
  };

  const insertDate = (date: string) => {
    setDateValue(date);
    setTimeValue(!timeValue ? '00:00' : timeValue);
    setDateTimeValue(!timeValue ? insertTimeToDate(date, '00:00') : insertTimeToDate(date, timeValue));
  };

  const removeTime = () => {
    setTimeValue('00:00');
    setDateTimeValue(dayjs(dateTimeValue!).hour(0).minute(0).second(0).format('YYYY-MM-DDTHH:mm:ssZ'));
  };

  const insertTime = (time: string) => {
    setTimeValue(time);
    setDateTimeValue(insertTimeToDate(dateTimeValue!, time));
  };

  return (
    <HStack>
      <Box>
        <DateInput
          id={`${id}-date`}
          {...props}
          onChange={date => (isEmpty(date) ? removeDate() : insertDate(date!.toString()))}
          value={dateValue!}
        />
      </Box>
      <Box>
        <TimeInput
          id={`${id}-time`}
          value={dateValue ? timeValue! : undefined}
          isDisabled={!dateTimeValue}
          onChangeTime={time => (isEmpty(time) ? removeTime() : insertTime(time!))}
        />
      </Box>
    </HStack>
  );
};

export { DateTimeInput };

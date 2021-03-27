import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { Box } from '@chakra-ui/react';

import { TimeInput, TimeInputProps } from '../TimeInput';

export type DateTimeOnlyInputProps = Omit<TimeInputProps, 'onChange' | 'value'> & {
  onChange?: (dateTime: string | null) => void;
  value?: string | null;
  initDate?: string;
};

const DateTimeOnlyInput = ({ id, initDate = dayjs().toString(), value = null, onChange, ...props }: DateTimeOnlyInputProps) => {
  const insertTimeToDate = (date: string, time: string) => {
    const [hour, minute] = time.split(':');
    return dayjs(date).hour(Number(hour)).minute(Number(minute)).format('YYYY-MM-DDTHH:mm:ssZ');
  };

  const [timeValue, setTimeValue] = useState<string | null>('');

  useEffect(() => {
    if (timeValue === '') return;

    if (onChange) {
      if (timeValue === null) {
        onChange(null);
        return;
      }

      onChange(insertTimeToDate(value ? value : initDate, timeValue));
    }
  }, [timeValue]);

  return (
    <Box>
      <TimeInput
        id={id}
        value={value ? timeValue! : undefined}
        onChangeTime={time => (isEmpty(time) ? setTimeValue(null) : setTimeValue(time!))}
        {...props}
      />
    </Box>
  );
};

export { DateTimeOnlyInput };

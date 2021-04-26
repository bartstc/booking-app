import React from 'react';
import { useIntl } from 'react-intl';
import { Dayjs } from 'dayjs';
import { HStack } from '@chakra-ui/react';
import { DateInput } from 'react-hook-form-chakra-fields';

import { dayjs } from 'utils/dayjs';

interface IProps {
  trackedDay: Dayjs;
  setWeek: (date: Dayjs) => void;
}

const BookingDatePicker = ({ setWeek, trackedDay }: IProps) => {
  const { formatMessage } = useIntl();

  return (
    <HStack w='100%' maxW='260px' display={{ base: 'none', lg: 'block' }}>
      <DateInput
        isClearable={false}
        value={trackedDay?.toDate().toString()}
        placeholderText={formatMessage({ id: 'select-week', defaultMessage: 'Select week' })}
        onChange={value => {
          if (Array.isArray(value) || !value) return;
          setWeek(dayjs(value));
        }}
        minDate={new Date()}
      />
    </HStack>
  );
};

export { BookingDatePicker };

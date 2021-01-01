import React from 'react';
import ReactDate, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import dayjs from 'dayjs';
import { Input } from '@chakra-ui/react';

import en from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';

import { DatePickerStyles } from './DatePickerStyles';

registerLocale('en-GB', en);

interface IProps extends ReactDatePickerProps {
  borderColor: string;
  focusColor: string;
  isInvalid: boolean;
}

const DatePicker = ({ borderColor, focusColor, isInvalid, value, onChange, ...props }: IProps) => {
  const dateFormat = (props.dateFormat as string) ?? 'YYYY-MM-DDTHH:mm:ssZ';

  return (
    <DatePickerStyles isInvalid={isInvalid} borderColor={borderColor} focusColor={focusColor}>
      <Input
        as={ReactDate}
        autoComplete='off'
        minDate={new Date(1900, 1, 1)}
        maxDate={new Date(2999, 1, 1)}
        {...props}
        locale='en'
        dateFormat='yyyy/MM/dd'
        showPopperArrow={false}
        isClearable
        selected={value ? new Date(value) : null}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(value, event) => {
          if (!value || Array.isArray(value)) {
            onChange(value, event);
            return;
          }

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const date = dayjs(value as any)
            .hour(23)
            .minute(59)
            .second(59);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange(date.format(dateFormat) as any, event);
        }}
      />
    </DatePickerStyles>
  );
};

export { DatePicker };

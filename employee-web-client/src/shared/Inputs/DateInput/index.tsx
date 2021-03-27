/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import dayjs from 'dayjs';
import ReactDate, { ReactDatePickerProps, registerLocale } from 'react-datepicker';
import { Input, useColorMode, useColorModeValue, useTheme } from '@chakra-ui/react';

import en from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';

import { DatePickerStyles } from './DatePickerStyles';

registerLocale('en-GB', en);

export type DateInputProps = ReactDatePickerProps & {
  isInvalid?: boolean;
};

const DateInput = ({ isInvalid = false, value, onChange, ...props }: DateInputProps) => {
  const { colors } = useTheme();
  const { colorMode } = useColorMode();
  const invalidColor = useColorModeValue(colors.red[500], colors.red[300]);
  const validColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const clearBtnBackground = useColorModeValue(colors.blue[500], colors.blue[300]);
  const clearBtnColor = useColorModeValue(colors.white, colors.gray[900]);
  const calendarBackground = useColorModeValue(colors.white, colors.gray[700]);
  const calendarColor = useColorModeValue(colors.gray[700], colors.white);
  const calendarSelectedBackground = useColorModeValue(colors.blue[500], colors.blue[300]);
  const calendarDayHover = useColorModeValue(colors.gray[200], colors.gray[600]);

  const dateFormat = (props.dateFormat as string) ?? 'YYYY-MM-DDTHH:mm:ssZ';

  return (
    <DatePickerStyles
      isDarkMode={colorMode === 'dark'}
      isInvalid={isInvalid}
      borderColor={isInvalid ? invalidColor : validColor}
      focusColor={colors.blue[500]}
      clearBtnColor={clearBtnColor}
      clearBtnBackground={clearBtnBackground}
      calendarBackground={calendarBackground}
      calendarColor={calendarColor}
      calendarSelectedBackground={calendarSelectedBackground}
      calendarDayHover={calendarDayHover}
    >
      <Input
        as={ReactDate}
        autoComplete='off'
        minDate={new Date(1900, 1, 1)}
        maxDate={new Date(2999, 1, 1)}
        {...props}
        locale='en'
        dateFormat={props.showTimeInput ? 'yyy/MM/dd h:mm aa' : 'yyyy/MM/dd'}
        timeInputLabel={props.timeInputLabel ?? 'Time:'}
        showPopperArrow={false}
        isClearable
        selected={value ? new Date(value) : null}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onChange={(value: Date | [Date, Date] | null, event: React.SyntheticEvent<any> | undefined) => {
          if (!value || Array.isArray(value)) {
            onChange(value, event);
            return;
          }

          const date = dayjs(value).hour(0).minute(0).second(0);

          onChange(date.format(dateFormat) as any, event);
        }}
      />
    </DatePickerStyles>
  );
};

export { DateInput };

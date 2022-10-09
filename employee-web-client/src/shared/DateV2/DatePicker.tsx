import React, { forwardRef } from 'react';
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MaskedInput from 'react-text-mask';

import { Input, InputGroup, InputLeftElement, useFormControl, useColorMode, useColorModeValue, useTheme } from '@chakra-ui/react';
import { mdiCalendar } from '@mdi/js';
import pl from 'date-fns/locale/pl';
import { theme } from 'utils/theme';

import { Icon } from 'shared/Icon';

import { DatePickerStyles } from './DatePickerStyles';

registerLocale('pl', pl);

export interface IDatePickerProps extends ReactDatePickerProps {
  isInvalid?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
const CustomInput = forwardRef((props: any, ref) => {
  const input = useFormControl<HTMLInputElement>(props);

  return (
    <InputGroup>
      <InputLeftElement px={0} zIndex={0}>
        <Icon path={mdiCalendar} size='20px' color={theme.colors.gray['300']} />
      </InputLeftElement>
      <Input
        fontSize='sm'
        autocomplete='off'
        {...input}
        {...props}
        ref={ref}
        as={MaskedInput}
        mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      />
    </InputGroup>
  );
});

const DatePicker = ({ customInputRef, ...props }: IDatePickerProps) => {
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

  return (
    <DatePickerStyles
      isDarkMode={colorMode === 'dark'}
      isInvalid={props.isInvalid ?? false}
      borderColor={props.isInvalid ? invalidColor : validColor}
      focusColor={colors.blue[500]}
      clearBtnColor={clearBtnColor}
      clearBtnBackground={clearBtnBackground}
      calendarBackground={calendarBackground}
      calendarColor={calendarColor}
      calendarSelectedBackground={calendarSelectedBackground}
      calendarDayHover={calendarDayHover}
    >
      <ReactDatePicker
        locale='pl'
        dateFormat='dd-MM-yyyy'
        customInput={
          <CustomInput
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={customInputRef as any}
            isInvalid={props.isInvalid}
          />
        }
        {...props}
      />
    </DatePickerStyles>
  );
};

export { DatePicker };

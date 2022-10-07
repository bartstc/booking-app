import React, { forwardRef } from 'react';
import ReactDatePicker, { registerLocale, ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MaskedInput from 'react-text-mask';

import { Input, InputGroup, InputLeftElement, useFormControl } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import { mdiCalendar } from '@mdi/js';
import pl from 'date-fns/locale/pl';
import { theme } from 'theme';

import { Icon } from 'shared/Icon';

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
  return (
    <>
      <Global
        styles={css`
          .react-datepicker-popper {
            z-index: 11;
          }
        `}
      />
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
    </>
  );
};

export { DatePicker };

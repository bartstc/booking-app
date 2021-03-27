import React from 'react';
import dayjs from 'dayjs';

import { MaskedInput, MaskedInputProps } from '../MaskedInput';

export interface TimeInputProps extends MaskedInputProps {
  onChangeTime?: (time: string | null) => void;
}

const TimeInput = ({ onChangeTime, ...props }: TimeInputProps) => {
  const valueToInteger = (val: string) => parseInt(val, 10);
  const valueToString = (val: number) => val.toString().padStart(2, '0');

  return (
    <MaskedInput
      mask={[/\d/, /\d/, ':', /\d/, /\d/]}
      placeholder='00:00'
      maxW='120px'
      {...props}
      onBlur={e => {
        if (props.onBlur) {
          props.onBlur(e);
        }

        if (onChangeTime) {
          const value = e.target.value;
          const [hour, minute] = value.split(':');
          const date = dayjs(new Date()).hour(valueToInteger(hour)).minute(valueToInteger(minute));

          if (date.isValid()) {
            onChangeTime(`${valueToString(date.hour())}:${valueToString(date.minute())}`);
            return;
          }

          onChangeTime('');
        }
      }}
      value={props.value ?? ''}
    />
  );
};

export { TimeInput };

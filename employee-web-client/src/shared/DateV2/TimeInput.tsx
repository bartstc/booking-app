/* eslint-disable react/prop-types */
import React, { forwardRef, memo, useEffect, useRef, useState } from 'react';
import MaskedInput from 'react-text-mask';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { mdiAlarm } from '@mdi/js';
import { inRange } from 'lodash';
import { theme } from 'theme';

import { dayjs } from 'utils';

import { Icon } from 'shared/Icon';

type Value = {
  value: Date;
  formatted: string;
  hour: number;
  minute: number;
  second: number | null;
};

interface IProps {
  value: Date | null;

  onChange(date: Value | null): void;

  onInvalid?(): void;

  placeholder?: string;
  isDisabled?: boolean;
  id?: string;
  ref?: React.Ref<MaskedInput> | null;
  isInvalid?: boolean;
}

// eslint-disable-next-line react/display-name
const TimeInput = memo(
  forwardRef<MaskedInput, IProps>((props, ref) => {
    const [_value, _setValue] = useState<string>(mapOutput(props.value));
    const isInvalid = useRef(false);

    useEffect(() => {
      if (props.value === null) {
        _setValue('');
      }
    }, [props.value]);

    return (
      <InputGroup flex={1} minW='125px'>
        <InputLeftElement px={0}>
          <Icon path={mdiAlarm} size='20px' color={theme.colors.gray['300']} />
        </InputLeftElement>
        <Input
          as={MaskedInput}
          mask={[/\d/, /\d/, ':', /\d/, /\d/]}
          id={props.id}
          // Ignore z tego względu, że Mamy Input który renderuje się jako MaskedInput i przez to jest konflikt typów
          // w referencji, z kolei jak wrzucimy od razu ostylowanego MaskedInputa to on źle współgra w InputGroup, więc
          // wybrałem najmniej inwazyjną drogę
          // @ts-ignore
          ref={ref}
          value={_value}
          onChange={({ target }) => {
            _setValue(target.value);

            if (target.value === _value) {
              return;
            }

            if (!target.value) {
              return props.onChange(null);
            }

            const [hour, minute, ...rest] = target.value
              .split(':')
              .map(val => (val?.length === 2 ? val : undefined))
              .map(val =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !isNaN(parseInt(val as any)) ? parseInt(val as any) : undefined,
              )
              .map((val, index) => {
                if (!val) return val;
                switch (index) {
                  case 0:
                    return inRange(val, 0, 25) ? val : undefined;
                  default:
                    return inRange(val, 0, 60) ? val : undefined;
                }
              });

            if (rest.length !== 0) {
              return;
            }

            try {
              const _result = dayjs(props.value).hour(hour!).minute(minute!).second(0).toDate();

              if (dayjs(_result).isValid()) {
                isInvalid.current = false;
                if (dayjs(props.value).isSame(_result)) {
                  return;
                }

                props.onChange({
                  formatted: target.value,
                  value: _result,
                  hour: hour!,
                  minute: minute!,
                  second: 0,
                });
              }
            } catch (e) {
              isInvalid.current = true;
              if (props.onInvalid) {
                props.onInvalid();
              }
            }
          }}
          onBlur={() => {
            if (isInvalid.current && _value !== '') {
              _setValue(mapOutput(props.value));
            }
          }}
          placeholder={props.placeholder}
          isDisabled={props.isDisabled}
          fontSize='sm'
          isInvalid={props.isInvalid}
        />
      </InputGroup>
    );
  }),
);

const mapOutput = (value: Date | null): string => {
  const valueToString = (val: number) => {
    return val.toString().padStart(2, '0');
  };

  const date = dayjs(value);
  if (date.isValid()) {
    return `${valueToString(date.hour())}:${valueToString(date.minute())}`;
  }
  return '';
};

export { TimeInput };

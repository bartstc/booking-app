import React from 'react';
import { Input, InputGroup, InputRightElement, Interpolation } from '@chakra-ui/react';
import { mdiAlertCircle, mdiCheckCircle } from '@mdi/js';

import { FieldPrototype } from './Builders';
import { Icon } from '../Icon';
import { FieldPrototypeProps } from './Builders/FieldPrototype';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldPrototypeProps;

const InputField = ({ name, label, required, disabled, helperText, id, tip, css, ...props }: Props) => {
  return (
    <FieldPrototype
      name={name}
      isRequired={required}
      isDisabled={disabled}
      helperText={helperText}
      tip={tip}
      id={id}
      label={label}
      css={css as Interpolation<Record<string, unknown>>}
    >
      {({ formState: { touched, errors } }, fieldProps) => {
        const isInvalid = Boolean(errors[name]);

        return (
          <InputGroup>
            <Input {...fieldProps} {...props} id={name} />
            {touched[name] && (
              <InputRightElement>
                <div>
                  <Icon path={isInvalid ? mdiAlertCircle : mdiCheckCircle} color={isInvalid ? 'red.500' : 'green.500'} size='24px' />
                </div>
              </InputRightElement>
            )}
          </InputGroup>
        );
      }}
    </FieldPrototype>
  );
};

export { InputField };

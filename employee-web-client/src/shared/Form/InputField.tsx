import React, { ElementType } from 'react';
import { Input, InputGroup, InputRightElement, Interpolation, useColorModeValue } from '@chakra-ui/react';
import { mdiAlertCircle, mdiCheckCircle } from '@mdi/js';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { Icon } from '../Icon';

export type InputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldPrototypeProps & { as?: ElementType };

const InputField = ({ name, label, required, disabled, helperText, id, tip, css, ...props }: InputFieldProps) => {
  const invalidColor = useColorModeValue('red.500', 'red.300');
  const validColor = useColorModeValue('green.500', 'green.300');

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
                  <Icon path={isInvalid ? mdiAlertCircle : mdiCheckCircle} color={isInvalid ? invalidColor : validColor} size='24px' />
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

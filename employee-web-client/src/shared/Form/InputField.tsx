import React, { ElementType } from 'react';
import { InputGroup, InputRightElement, Interpolation, Textarea, useColorModeValue } from '@chakra-ui/react';
import { mdiAlertCircle, mdiCheckCircle } from '@mdi/js';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { Icon } from '../Icon';
import { Input } from '../Inputs/Input';

export type InputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldPrototypeProps & { as?: ElementType };

const InputField = ({ name, label, required, disabled, helperText, id, tip, css, as, ...props }: InputFieldProps) => {
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
      {({ formState: { touched } }, fieldProps, { isInvalid }) => {
        const isTextarea = as === 'textarea';

        return (
          <InputGroup>
            <Input {...fieldProps} {...props} as={isTextarea ? Textarea : as} id={name} />
            {touched[name] && !isTextarea && (
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

import React, { ElementType } from 'react';
import { InputGroup, InputRightElement, Textarea, useColorModeValue } from '@chakra-ui/react';
import { WarningIcon, CheckCircleIcon } from '@chakra-ui/icons';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { Input } from '../Inputs/Input';

export type InputFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & FieldPrototypeProps & { as?: ElementType };

const InputField = ({
  name,
  label,
  required = true,
  disabled,
  helperText,
  id,
  tip,
  as,
  readModeComponent,
  colSpan,
  colStart,
  colEnd,
  rowSpan,
  rowStart,
  rowEnd,
  ...props
}: InputFieldProps) => {
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
      readModeComponent={readModeComponent}
      colSpan={colSpan}
      colStart={colStart}
      colEnd={colEnd}
      rowSpan={rowSpan}
      rowStart={rowStart}
      rowEnd={rowEnd}
    >
      {({ formState: { touched } }, fieldProps, { isInvalid }) => {
        const isTextarea = as === 'textarea';
        const iconColor = isInvalid ? invalidColor : validColor;

        return (
          <InputGroup>
            <Input {...fieldProps} {...props} as={isTextarea ? Textarea : as} id={id} />
            {touched[name] && !isTextarea && (
              <InputRightElement>
                {isInvalid ? <WarningIcon color={iconColor} w='20px' h='20px' /> : <CheckCircleIcon color={iconColor} w='20px' h='20px' />}
              </InputRightElement>
            )}
          </InputGroup>
        );
      }}
    </FieldPrototype>
  );
};

export { InputField };

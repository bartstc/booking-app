import React from 'react';
import { InputGroup, InputRightElement, Interpolation, useColorModeValue, Flex, chakra, Text } from '@chakra-ui/react';
import { mdiAlertCircle, mdiCheckCircle } from '@mdi/js';
import { get } from 'lodash';

import { FieldPrototype, FieldPrototypeProps } from './Builders';
import { Icon } from '../Icon';
import { MoneyInput, MoneyInputProps } from '../Inputs/MoneyInput';
import { MoneyText } from '../Money';

export type MoneyFieldProps = Omit<MoneyInputProps, 'value'> & FieldPrototypeProps;

const MoneyField = ({ name, label, required, disabled, helperText, id, tip, css, children, ...props }: MoneyFieldProps) => {
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
      readModeComponent={({ value }) => {
        if (!value) {
          return <Text>---</Text>;
        }

        return (
          <Text>
            <MoneyText value={value} /> {children}
          </Text>
        );
      }}
    >
      {({ formState: { touched } }, fieldProps, { isInvalid }) => {
        return (
          <InputGroup>
            <Flex w='100%'>
              <chakra.div flex={children ? '.7' : '1'}>
                <MoneyInput {...fieldProps} {...props} id={id} />
                {get(touched, name) && !children && (
                  <InputRightElement>
                    <div>
                      <Icon path={isInvalid ? mdiAlertCircle : mdiCheckCircle} color={isInvalid ? invalidColor : validColor} size='24px' />
                    </div>
                  </InputRightElement>
                )}
              </chakra.div>
              {children && (
                <chakra.div flex='.3' ml={4}>
                  {children}
                </chakra.div>
              )}
            </Flex>
          </InputGroup>
        );
      }}
    </FieldPrototype>
  );
};

export { MoneyField };

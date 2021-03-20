import React, { ReactNode } from 'react';
import {
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  FormControl,
  FormControlProps,
  HStack,
  chakra,
  useColorModeValue,
  GridItem,
} from '@chakra-ui/react';
import { mdiInformation } from '@mdi/js';

import { Icon } from '../../Icon';
import { Tooltip } from '../../Tooltip';
import { GridItemProps } from '../types';

export interface IFieldControlProps extends Omit<FormControlProps, 'helperText' | 'errorText' | 'id' | 'label'>, GridItemProps {
  name: string;
  id: string;
  label?: ReactNode | string;
  helperText?: ReactNode | string;
  errorText?: ReactNode | string;
  tip?: ReactNode | string;
  isReadMode?: boolean;
}

const FieldControl = ({
  errorText,
  helperText,
  label,
  children,
  tip,
  id,
  isReadMode = false,
  isRequired,
  ...props
}: IFieldControlProps) => {
  const infoIconColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <FormControl
      as={GridItem}
      mb={isReadMode ? { base: 6, md: 8 } : 4}
      id={id}
      data-testid={id}
      isRequired={isReadMode ? false : isRequired}
      {...props}
    >
      <HStack spacing={0}>
        {label && (
          <FormLabel lineHeight={isReadMode ? '7px' : 'auto'} fontSize={isReadMode ? 'sm' : 'md'} color={isReadMode ? 'gray.500' : 'auto'}>
            {label}
          </FormLabel>
        )}
        {tip && !isReadMode && (
          <Tooltip label={tip}>
            <chakra.div mb='8px'>
              <Icon path={mdiInformation} size='17px' color={infoIconColor} />
            </chakra.div>
          </Tooltip>
        )}
      </HStack>
      {children}
      <FormErrorMessage lineHeight='1rem'>{errorText}</FormErrorMessage>
      <FormHelperText lineHeight='1rem'>{helperText}</FormHelperText>
    </FormControl>
  );
};

export { FieldControl };

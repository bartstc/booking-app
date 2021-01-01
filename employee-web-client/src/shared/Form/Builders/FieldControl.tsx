import React, { ReactNode } from 'react';
import { FormHelperText, FormErrorMessage, FormLabel, FormControl, FormControlProps, HStack, chakra } from '@chakra-ui/react';
import { mdiInformation } from '@mdi/js';

import { Icon } from '../../Icon';
import { Tooltip } from '../../Tooltip';

export interface IFieldControlProps extends Omit<FormControlProps, 'helperText' | 'errorText' | 'id' | 'label'> {
  name: string;
  id: string;
  label?: ReactNode | string;
  helperText?: ReactNode | string;
  errorText?: ReactNode | string;
  tip?: ReactNode | string;
}

const FieldControl = ({ errorText, helperText, label, children, tip, name, id, css, ...props }: IFieldControlProps) => {
  return (
    <FormControl mb={4} {...css} id={id} {...props}>
      <HStack spacing={0}>
        {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
        {tip && (
          <Tooltip label={tip}>
            <chakra.div mb='8px'>
              <Icon path={mdiInformation} size='17px' color='blue.500' />
            </chakra.div>
          </Tooltip>
        )}
      </HStack>
      {children}
      <FormErrorMessage lineHeight='13px'>{errorText}</FormErrorMessage>
      <FormHelperText lineHeight='13px'>{helperText}</FormHelperText>
    </FormControl>
  );
};

export { FieldControl };

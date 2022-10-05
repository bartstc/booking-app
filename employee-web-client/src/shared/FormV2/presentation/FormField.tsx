import React, { ReactElement, ReactNode } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  GridItemProps,
  HStack,
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';
import { mdiInformation } from '@mdi/js';
import { kebabCase } from 'lodash';

import { Icon } from 'shared/Icon';
import { Tooltip } from 'shared/Tooltip';

import { mapGridProps } from '../utils';

export interface IFormFieldProps extends Omit<GridItemProps, 'defaultValue'> {
  name: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  label?: ReactElement | string;
  errorMessage?: ReactNode;
  helperText?: ReactNode;
  children?: ReactElement | string;
  tip?: ReactElement | string;
  size?: 'sm' | 'md';
  defaultValue?: string | number | null | undefined;
}

// memoizacja komponentu nie ma sensu ze względu na propsy typu ReactElement np. children
// https://gist.github.com/slikts/e224b924612d53c1b61f359cfb962c06
// komponent nie powinien mieć wymagających przeliczeń, jeśli musi to należy je zoptymalizować
const FormField = (props: IFormFieldProps) => {
  const {
    colSpan,
    colStart,
    colEnd,
    rowEnd,
    rowSpan,
    rowStart,
    size = 'md',
    name,
    isRequired,
    isInvalid,
    label,
    errorMessage,
    helperText,
    children,
    tip,
    defaultValue,
    ...styledProps
  } = props;
  const { colors } = useTheme();
  const invalidColor = useColorModeValue(colors.red[500], colors.red[300]);

  const styles = mapGridProps({
    colSpan,
    rowStart,
    rowSpan,
    colEnd,
    colStart,
    rowEnd,
  });

  return (
    <FormControl
      id={kebabCase(name)}
      isRequired={isRequired}
      isInvalid={isInvalid}
      sx={styles}
      width='auto'
      defaultValue={defaultValue ?? undefined}
      {...styledProps}
    >
      <HStack spacing={0}>
        <FormLabel fontSize='sm' color={isInvalid ? invalidColor : undefined}>
          {label}
        </FormLabel>
        {tip && (
          <Tooltip label={tip}>
            <Icon path={mdiInformation} size={size === 'sm' ? '16px' : '20px'} />
          </Tooltip>
        )}
      </HStack>
      {children}
      <FormErrorMessage fontSize='sm'>{errorMessage}</FormErrorMessage>
      {helperText && <FormHelperText fontSize='sm'>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export { FormField };

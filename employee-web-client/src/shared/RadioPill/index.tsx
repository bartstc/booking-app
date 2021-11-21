import React from 'react';
import { Box, RadioProps, ChakraProps, useColorModeValue, useRadio, WrapItem } from '@chakra-ui/react';

interface IProps extends RadioProps {
  checked: boolean;
  radioStyles?: ChakraProps;
}

const RadioPill = ({ checked, radioStyles, ...props }: IProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const bg = useColorModeValue('transparent', 'gray.600');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const color = useColorModeValue('gray.600', 'white');
  const checkedColor = useColorModeValue('primary.500', 'primary.300');
  const checkedBgColor = useColorModeValue('transparent', 'gray.600');
  const checkedBorderColor = useColorModeValue('primary.500', 'primary.300');

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <WrapItem as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='2px'
        borderRadius='2xl'
        fontWeight='600'
        borderColor={checked ? checkedBorderColor : borderColor}
        color={checked ? checkedColor : color}
        bg={checked ? checkedBgColor : bg}
        px={5}
        py={1}
        {...radioStyles}
      >
        {props.children}
      </Box>
    </WrapItem>
  );
};
export { RadioPill };

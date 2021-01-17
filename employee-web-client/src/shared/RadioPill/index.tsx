import React from 'react';
import { Box, RadioProps, useColorModeValue, useRadio, WrapItem } from '@chakra-ui/react';

interface IProps extends RadioProps {
  checked: boolean;
}

const RadioPill = ({ checked, ...props }: IProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const bg = useColorModeValue('transparent', 'gray.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
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
        borderColor={borderColor}
        borderRadius='2xl'
        fontWeight='700'
        color={color}
        bg={bg}
        _checked={
          checked
            ? {
                bg: checkedBgColor,
                color: checkedColor,
                borderColor: checkedBorderColor,
              }
            : {}
        }
        px={5}
        py={1}
      >
        {props.children}
      </Box>
    </WrapItem>
  );
};
export { RadioPill };

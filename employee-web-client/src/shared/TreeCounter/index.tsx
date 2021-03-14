import React from 'react';
import { Box, Center, useColorModeValue, VStack } from '@chakra-ui/react';

interface IProps {
  index: number;
  fieldsCount: number;
}

const TreeCounter = ({ index, fieldsCount }: IProps) => {
  const countBoxColor = useColorModeValue('blue.500', 'blue.400');

  return (
    <VStack w='28px' spacing={3} mr={6} mt={2} mb={index === fieldsCount - 1 ? 8 : 0}>
      <Center backgroundColor={countBoxColor} w='100%' borderRadius='50%' color='white' fontWeight='700' fontSize='12px' lineHeight='26px'>
        {index + 1}
      </Center>
      <Box h='100%' w='1px' backgroundColor={countBoxColor} />
    </VStack>
  );
};

export { TreeCounter };

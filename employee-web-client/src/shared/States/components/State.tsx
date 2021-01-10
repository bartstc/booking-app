import React, { ReactElement } from 'react';
import { Box, ChakraProps, Image, useBreakpointValue, useColorModeValue, Heading, Text, VStack } from '@chakra-ui/react';

interface IProps extends ChakraProps {
  image: ReactElement | string;
  header: ReactElement;
  description: ReactElement;
  alt?: string;
  children?: ReactElement;
}

const State = ({ description, header, image, alt, children, ...props }: IProps) => {
  const size = useBreakpointValue({ base: '280px', md: '640px', lg: '800px' });
  const color = useColorModeValue('primary.500', 'primary.300');

  return (
    <VStack width='100%' margin='0 auto' spacing={4} mt={{ base: 12, md: 20 }} {...props}>
      <Heading textAlign='center' as='h2' color={color} fontSize={{ base: '2xl', md: '5xl' }} fontWeight='900'>
        {header}
      </Heading>
      <Text textAlign='center' fontSize={{ base: 'sm', md: 'xl' }} maxWidth={{ base: '300px', md: '640px' }}>
        {description}
      </Text>
      {children}
      <Box>{typeof image === 'string' ? <Image mt={4} src={image} alt={alt} width={size} /> : image}</Box>
    </VStack>
  );
};

export { State };

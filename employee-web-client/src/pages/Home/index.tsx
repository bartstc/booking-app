import React from 'react';
import { chakra, Box, useColorModeValue, HStack, Button, Stack } from '@chakra-ui/react';

import { LoginButton } from 'modules/auth/presentation';

import { Feature } from './Feature';

const Home = () => {
  return (
    <Box px={4} py={32} mx='auto'>
      <Box w={{ base: 'full', md: 11 / 12, xl: 8 / 12 }} textAlign={{ base: 'left', md: 'center' }} mx='auto'>
        <chakra.h1
          mb={3}
          fontSize={{ base: '4xl', md: '5xl' }}
          fontWeight={{ base: 'bold', md: 'extrabold' }}
          color={useColorModeValue('gray.900', 'gray.100')}
          lineHeight='shorter'
        >
          Booking has never been so easy.
        </chakra.h1>
        <chakra.p mb={6} fontSize={{ base: 'lg', md: 'xl' }} color='gray.500' lineHeight='base'>
          The easiest-to-use system for making appointments, managing the showroom and accepting cashless payments. Try it today and see for
          yourself how simple it is.
        </chakra.p>
        <HStack m='0 auto' w='100%' spacing={3} pt={1} mb={8} justify='center'>
          <Button variant='solid' size='lg' colorScheme='primary'>
            Get Started
          </Button>
          <LoginButton size='lg' />
        </HStack>
        <Stack
          display='flex'
          direction={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'start', md: 'center' }}
          mb={3}
          spacing={{ base: 2, md: 8 }}
          fontSize='xs'
          color='gray.600'
        >
          <Feature>No credit card required</Feature>
          <Feature>14 days free</Feature>
          <Feature>Cancel anytime</Feature>
        </Stack>
      </Box>
    </Box>
  );
};

export default Home;

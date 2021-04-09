import React from 'react';
import { VStack, HStack, Heading, Text, Avatar, useColorModeValue, Badge } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { IOffer } from '../../../application/types';
import { OfferStatusBadge } from '../../OfferStatusBadge';

interface IProps {
  offer: IOffer;
}

const ListItem = ({ offer: { name, price, duration, status } }: IProps) => {
  const background = useColorModeValue('gray.50', 'gray.700');

  return (
    <HStack spacing={3} justify='space-between' align='start' w='100%' mb={2} p='10px' borderRadius={8} backgroundColor={background}>
      <HStack align='start' spacing={3}>
        <Avatar name={name} size='sm' />
        <VStack align='flex-start' spacing='10px'>
          <VStack align='flex-start' spacing={0}>
            <Heading
              lineHeight={{ base: '1.15rem', md: '1.3rem' }}
              as='h5'
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight='700'
              isTruncated
              width='100%'
            >
              {name}
            </Heading>
            <Text as='span' isTruncated fontSize='xs' width='100%'>
              {duration} <FormattedMessage id='minutes-short' defaultMessage='min' />
            </Text>
          </VStack>
          <HStack>
            <Badge variant='solid' colorScheme='primary'>
              {price.value} {price.currency}
            </Badge>
            <OfferStatusBadge status={status} />
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};

export { ListItem };

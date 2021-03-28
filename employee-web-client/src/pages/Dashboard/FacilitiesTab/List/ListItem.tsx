import React from 'react';
import { VStack, HStack, Heading, Text, Avatar, Tag, TagLabel, useColorModeValue } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

import { IFacility } from 'modules/facility/types';
import { ActionButtons } from '../ActionButtons';

interface IProps {
  facility: IFacility;
}

const ListItem = ({ facility: { address, name, contactPerson, slug } }: IProps) => {
  const { push } = useHistory();
  const background = useColorModeValue('gray.50', 'gray.700');

  return (
    <HStack
      onClick={() => push(`/dashboard/facilities/${slug}`)}
      spacing={3}
      justify='space-between'
      align='start'
      w='100%'
      mb={2}
      p='10px'
      borderRadius={8}
      backgroundColor={background}
    >
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
              {address.city}, {address.street}
            </Text>
          </VStack>
          <HStack>
            {contactPerson?.phone && (
              <Tag variant='subtle' colorScheme='primary' size='sm'>
                <TagLabel isTruncated width='100%'>
                  {contactPerson.phone}
                </TagLabel>
              </Tag>
            )}
            {!contactPerson?.phone && contactPerson?.email && (
              <Tag variant='subtle' colorScheme='primary' size='sm'>
                <TagLabel isTruncated width='100%'>
                  {contactPerson.email}
                </TagLabel>
              </Tag>
            )}
          </HStack>
        </VStack>
      </HStack>
      <ActionButtons {...contactPerson} />
    </HStack>
  );
};

export { ListItem };

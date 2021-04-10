import React from 'react';
import { VStack, HStack, Heading, Avatar, useColorModeValue, Tag, TagLabel } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { FormattedDate } from 'shared/Date';

import { ISchedule } from '../../../application/types';

interface IProps {
  schedule: ISchedule;
}

const ListItem = ({ schedule: { name, endDate, startDate } }: IProps) => {
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
          </VStack>
          <HStack>
            <Tag variant='subtle' colorScheme='primary' size='sm'>
              <TagLabel isTruncated width='100%' display='flex'>
                <FormattedMessage id='start' defaultMessage='Start' />
                {': '} <FormattedDate value={startDate} />
              </TagLabel>
            </Tag>
            <Tag variant='subtle' colorScheme='primary' size='sm'>
              <TagLabel isTruncated width='100%' display='flex'>
                <FormattedMessage id='end' defaultMessage='End' />
                {': '} <FormattedDate value={endDate} />
              </TagLabel>
            </Tag>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
};

export { ListItem };

import React from 'react';
import { VStack, HStack, Heading, Text, Avatar, useColorModeValue } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { IEmployee } from 'modules/employees/types';
import { ContactButtons, ContactTags } from 'shared/Contact';

interface IProps {
  employee: IEmployee;
}

const ListItem = ({ employee: { name, contacts, position } }: IProps) => {
  const { formatMessage } = useIntl();
  const background = useColorModeValue('gray.50', 'gray.700');

  return (
    <HStack spacing={3} justify='space-between' align='start' w='100%' mb={2} p='10px' borderRadius={8} backgroundColor={background}>
      <HStack align='start' spacing={3}>
        <Avatar name={name} size='sm' />
        <VStack align='flex-start' spacing='10px'>
          <VStack align='flex-start' spacing={0}>
            <Heading
              lineHeight={{ base: '14px', md: '18px' }}
              as='h5'
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight='700'
              isTruncated
              width='100%'
            >
              {name}
            </Heading>
            <Text as='span' isTruncated fontSize='xs' width='100%'>
              {position}
            </Text>
          </VStack>
          <ContactTags contacts={contacts} />
        </VStack>
      </HStack>
      <ContactButtons contacts={contacts} subject={formatMessage({ id: 'employee', defaultMessage: 'employee' })} />
    </HStack>
  );
};

export { ListItem };

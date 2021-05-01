import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  chakra,
  Divider,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

import { useModal } from 'hooks';
import { ContactType } from 'types';
import { Button } from 'shared/Button';
import { FormattedDate } from 'shared/Date';

import { IBookedRecord } from 'modules/booking/application/types';
import { useFetchCustomer } from 'modules/customers/infrastructure/query';

interface IProps {
  record: IBookedRecord;
}

const EventPopover = ({ record }: IProps) => {
  const { onOpen, onClose, isOpen } = useModal();
  const avatarBg = useColorModeValue('gray.300', 'gray.600');
  const [customer, isLoading] = useFetchCustomer(record.customerId);

  const customerPhone = customer?.contacts.find(contact => contact.type === ContactType.Phone);

  const calculateOffset = () => {
    const minutePixels = 5 / 3; // 60 min = 100px

    return (record.duration / 2) * minutePixels;
  };

  return (
    <Popover placement='bottom' isLazy onOpen={onOpen} onClose={onClose} isOpen={isOpen}>
      <PopoverTrigger>
        <Button colorScheme='blue' opacity={0.7} w='100%' h='100%'>
          <VStack spacing={1} w='100%' align='flex-start' justify='flex-start'>
            <chakra.p fontWeight='700'>{record.offerName}</chakra.p>
            <HStack fontSize='sm'>
              <FormattedDate value={record.dateFrom} format='HH:mm' />
              <Text> - </Text>
              <FormattedDate value={record.dateTo} format='HH:mm' />
            </HStack>
          </VStack>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        width={{ base: 320, md: 370 }}
        position='absolute'
        transform={`translate(-25%, ${calculateOffset() + 3}px) !important`}
      >
        <PopoverHeader pt={4} fontWeight='bold' border='0'>
          {record.offerName}
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          {isLoading ? (
            <Spinner />
          ) : (
            <VStack spacing={3} align='stretch'>
              <HStack spacing={3}>
                <Avatar bg={avatarBg} size='sm' />
                <VStack align='flex-start' spacing={1}>
                  <Box lineHeight='.9rem' fontSize='sm'>
                    {customer?.fullName}
                  </Box>
                  <Box fontSize='xs' color='gray.500'>
                    <FormattedMessage
                      id='phone-number-value'
                      defaultMessage='Phone: {value}'
                      values={{
                        value: customerPhone?.value,
                      }}
                    />
                  </Box>
                </VStack>
              </HStack>
              <Divider />
              <VStack fontSize='sm' align='flex-start'>
                <FormattedDate value={record.dateFrom} format='DD MMM (dddd) HH:mm' />
                <Badge px={2} fontSize='.9rem' colorScheme='primary'>
                  {record.price} {record.currency}
                </Badge>
              </VStack>
            </VStack>
          )}
        </PopoverBody>
        <PopoverFooter d='flex' alignItems='center' justifyContent='flex-end' pb={4}>
          <ButtonGroup>
            <Button size='sm' colorScheme='gray' onClick={onClose}>
              <FormattedMessage id='close' defaultMessage='Close' />
            </Button>
            <Button size='sm' colorScheme='gray'>
              <FormattedMessage id='details' defaultMessage='Details' />
            </Button>
            <Button size='sm' colorScheme='green'>
              <FormattedMessage id='settle' defaultMessage='Settle' />
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export { EventPopover };

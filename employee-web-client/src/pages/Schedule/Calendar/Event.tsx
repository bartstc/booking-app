import React, { ReactNode } from 'react';
import { FormattedMessage, FormattedTime } from 'react-intl';
import { chakra, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';

import { IBookedOfferDto } from 'modules/schedule/dto/IBookedOfferDto';
import { Tooltip } from 'shared/Tooltip';

export const Event = ({ event }: { event: IBookedOfferDto }) => {
  const eventBgColor = useColorModeValue('primary.500', 'primary.300');

  return (
    <chakra.div width='100%' minH='20px' backgroundColor={eventBgColor}>
      <VStack align='start'>
        <Text>{event.name}</Text>
      </VStack>
    </chakra.div>
  );
};

export const EventWrapper = ({ children, event }: { children: ReactNode; event: IBookedOfferDto }) => {
  const eventBgColor = useColorModeValue('primary.500', 'primary.300');

  return (
    <Tooltip
      hasArrow
      label={
        <HStack p={1}>
          <Text>
            <FormattedMessage id='from' defaultMessage='From: ' />
            <b>
              <FormattedTime value={event.dateFrom} />
            </b>
          </Text>
          <Text>
            <FormattedMessage id='to' defaultMessage='To: ' />
            <b>
              <FormattedTime value={event.dateTo} />
            </b>
          </Text>
        </HStack>
      }
    >
      <chakra.div cursor='pointer' backgroundColor={eventBgColor} borderRadius='5px'>
        {children}
      </chakra.div>
    </Tooltip>
  );
};

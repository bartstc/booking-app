import React, { useState } from 'react';
import { VStack } from '@chakra-ui/react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { IBookedOfferDto } from 'modules/schedule/dto/IBookedOfferDto';
import { PriceModel } from 'modules/offers/types';
import { Currency } from 'types';

import { CalendarConfiguration } from './CalendarConfiguration';

const todayOffer: IBookedOfferDto = {
  employerId: '111',
  offerId: '123',
  employerName: 'John Doe',
  dateFrom: new Date(),
  dateTo: new Date(),
  name: 'Dzisiejsza rezerwacja',
  duration: '40',
  status: 'booked',
  price: {
    type: PriceModel.Constant,
    currency: Currency.Pln,
    value: '40',
  },
};

const resources = [
  {
    id: '456',
    employerId: '111',
    employerName: 'Sam Smith',
  },
  {
    id: '789',
    employerId: '222',
    employerName: 'Sally Thomson',
  },
];

const Calendar = () => {
  const [events, setEvents] = useState<Array<IBookedOfferDto>>([todayOffer]);

  return (
    <VStack w='100%' maxW='1200px' pb={{ base: 4, md: 10 }}>
      <CalendarConfiguration
        events={events}
        resources={resources}
        onSelectEvent={event => {
          console.log(event);
        }}
      />
    </VStack>
  );
};

export { Calendar };

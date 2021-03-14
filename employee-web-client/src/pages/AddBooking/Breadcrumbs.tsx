import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box, useColorModeValue } from '@chakra-ui/react';

import { BreadcrumbIcon } from 'shared/Icons';

const Breadcrumbs = () => {
  const accentColor = useColorModeValue('primary.500', 'primary.300');

  return (
    <Box w='100%'>
      <Breadcrumb fontSize='md' spacing='8px' separator={<BreadcrumbIcon />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={'bookings'}>
            <FormattedMessage id='calendar' defaultMessage='Calendar' />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage color={accentColor}>
          <BreadcrumbLink href='#'>
            <FormattedMessage id='add-booking-form' defaultMessage='Booking Form' />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Box>
  );
};

export { Breadcrumbs };

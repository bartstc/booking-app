import React from 'react';
import { mdiChevronRight } from '@mdi/js';
import { useColorModeValue } from '@chakra-ui/react';

import { Icon } from '../Icon';

const BreadcrumbIcon = () => {
  const color = useColorModeValue('gray.700', 'gray.400');

  return <Icon path={mdiChevronRight} size='1.25rem' color={color} />;
};

export { BreadcrumbIcon };

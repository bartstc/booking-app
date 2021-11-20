import React from 'react';
import { Badge } from '@chakra-ui/react';

import { PriceModel } from '../../application/types';

interface IProps {
  type: PriceModel;
}

const PriceModelBadge = ({ type }: IProps) => {
  return (
    <Badge variant='subtle' colorScheme={type === PriceModel.Free ? 'green' : 'blue'}>
      {type}
    </Badge>
  );
};

export { PriceModelBadge };

import React from 'react';
import { Badge } from '@chakra-ui/react';

import { GridItem } from 'shared/Grid';

interface IProps {
  index: number;
}

const Row = ({ index }: IProps) => {
  return (
    <GridItem>
      <div className='cell'>{index}</div>
      <div className='cell'>John Doe</div>
      <div className='cell'>
        <Badge variant='solid' colorScheme='primary'>
          2 Pending
        </Badge>
      </div>
      <div className='cell'>+48 444 555 322</div>
      <div className='cell'>johndoe@gmail.com</div>
      <div className='cell'>{''}</div>
    </GridItem>
  );
};

export { Row };

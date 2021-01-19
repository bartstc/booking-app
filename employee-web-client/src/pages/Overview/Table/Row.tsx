import React from 'react';
import { Badge, Flex } from '@chakra-ui/react';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { BusinessCategoryDegreeType, BusinessCategoryType, IFacility } from 'modules/facility/types';
import { ActionButtons } from '../ActionButtons';

interface IProps {
  index: number;
  facility: IFacility;
}

const Row = ({ index, facility }: IProps) => {
  const address = `${facility.address.countryCode}, ${facility.address.city}, ${facility.address.street}`;
  const mainBusinessCategory =
    facility.businessCategories.find(category => category.degree === BusinessCategoryDegreeType.Main)?.type ?? BusinessCategoryType.Other;

  return (
    <GridItem>
      <TruncatedCell>{index}</TruncatedCell>
      <TruncatedCell>{facility.name}</TruncatedCell>
      <TruncatedCell>{facility.contactPerson?.phone ?? '---'}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>{address}</TruncatedCell>
      <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
        <Badge variant='solid' colorScheme='yellow'>
          {mainBusinessCategory}
        </Badge>
      </Flex>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>{facility.contactPerson?.email ?? '---'}</TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <ActionButtons {...facility.contactPerson} />
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };

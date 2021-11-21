import React from 'react';
import { Badge, Flex, useDisclosure } from '@chakra-ui/react';

import { CollapseGridItem, CollapseIcon, GridItem, TruncatedCell } from 'shared/Grid';

import { ActionButtons } from '../ActionButtons';
import { BusinessCategoryDegreeType, BusinessCategoryType, IFacility } from '../../../application/types';
import { FacilityBody } from '../../FacilityBody';

interface IProps {
  facility: IFacility;
}

const Row = ({ facility }: IProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const address = `${facility.address.postCode}, ${facility.address.city}, ${facility.address.street}`;
  const mainBusinessCategory =
    facility.businessCategories.find(category => category.degree === BusinessCategoryDegreeType.Main)?.type ?? BusinessCategoryType.Other;

  return (
    <GridItem isExpanded={isOpen} onClick={onToggle}>
      <TruncatedCell>
        <CollapseIcon isOpen={isOpen} />
      </TruncatedCell>
      <TruncatedCell isBold>{facility.name}</TruncatedCell>
      <TruncatedCell>{facility.contactPerson?.phone ?? '---'}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>{address}</TruncatedCell>
      <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
        <Badge variant='solid' colorScheme='yellow'>
          {mainBusinessCategory}
        </Badge>
      </Flex>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>{facility.contactPerson?.email ?? '---'}</TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <ActionButtons {...facility.contactPerson} slug={facility.slug} />
      </TruncatedCell>
      <CollapseGridItem isOpen={isOpen}>
        <FacilityBody facility={facility} />
      </CollapseGridItem>
    </GridItem>
  );
};

export { Row };

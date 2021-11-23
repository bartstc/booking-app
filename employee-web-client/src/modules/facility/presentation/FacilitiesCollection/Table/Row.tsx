import React from 'react';
import { Badge, Flex, useDisclosure } from '@chakra-ui/react';

import { CollapsableCell, CollapseGridItem, GridItem, TruncatedCell } from 'shared/Grid';

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
    <>
      <GridItem onClick={onToggle}>
        <CollapsableCell isOpen={isOpen} />
        <TruncatedCell isBold>{facility.name}</TruncatedCell>
        <TruncatedCell>{facility.contactPerson?.phone ?? '---'}</TruncatedCell>
        <TruncatedCell display={{ base: 'none', md: 'flex' }}>{address}</TruncatedCell>
        <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
          <Badge variant='subtle' colorScheme='yellow'>
            {mainBusinessCategory}
          </Badge>
        </Flex>
        <TruncatedCell display={{ base: 'none', lg: 'flex' }}>{facility.contactPerson?.email ?? '---'}</TruncatedCell>
        <TruncatedCell justify='flex-end'>
          <ActionButtons {...facility.contactPerson} slug={facility.slug} />
        </TruncatedCell>
      </GridItem>
      <CollapseGridItem isOpen={isOpen}>
        <FacilityBody facility={facility} />
      </CollapseGridItem>
    </>
  );
};

export { Row };

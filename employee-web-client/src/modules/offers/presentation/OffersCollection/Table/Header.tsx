import React from 'react';

import { CheckboxParent } from 'shared/Selectable';
import { GridHeader, HeaderCell } from 'shared/GridTable';

import { useOffersColumnsLabels } from '../useOffersColumnsLabels';

interface IProps {
  collectionIds: string[];
}

const Header = ({ collectionIds }: IProps) => {
  const labels = useOffersColumnsLabels();

  return (
    <GridHeader>
      <HeaderCell name='checkbox' withTooltip={false}>
        <CheckboxParent items={collectionIds} />
      </HeaderCell>
      <HeaderCell name='name'>{labels['name']}</HeaderCell>
      <HeaderCell name='status'>{labels['status']}</HeaderCell>
      <HeaderCell name='duration' isNumeric>
        {labels['duration']}
      </HeaderCell>
      <HeaderCell name='price' isNumeric>
        {labels['price']}
      </HeaderCell>
      <HeaderCell name='priceType'>{labels['priceType']}</HeaderCell>
      <HeaderCell name='actions'>{''}</HeaderCell>
    </GridHeader>
  );
};

export { Header };

import React from 'react';
import { FormattedRelativeTime } from 'react-intl';

import { selectUnit } from '@formatjs/intl-utils';

interface IProps {
  value: Date | string;
}

const FormattedRelative = ({ value }: IProps) => {
  const selectedUnit = selectUnit(new Date(value));

  if (isNaN(selectedUnit.value)) return null;

  return (
    <FormattedRelativeTime
      value={selectedUnit.value}
      unit={selectedUnit.unit}
      numeric='auto'
      updateIntervalInSeconds={selectedUnit.unit === 'minute' || selectedUnit.unit === 'second' ? 10 : undefined}
    />
  );
};

export { FormattedRelative };

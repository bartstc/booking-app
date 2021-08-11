import React from 'react';
import { useRadioGroup, Wrap } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { OptionType } from 'types';

import { useQueryParams } from '../Params';
import { RadioPill } from '../RadioPill';

interface IProps {
  filterName: string;
  options: OptionType[];
}

const RadioFilterGroup = ({ filterName, options }: IProps) => {
  const { formatMessage } = useIntl();
  const { change, remove, has, get } = useQueryParams();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: filterName,
    defaultValue: 'all',
    onChange: nextValue => (nextValue === 'all' ? remove(filterName) : change(filterName, nextValue)),
  });

  const group = getRootProps();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allRadio = getRadioProps({ value: 'all' } as any);

  return (
    <Wrap {...group} spacing='.9rem'>
      <RadioPill {...allRadio} checked={!get(filterName)}>
        {formatMessage({ id: 'all', defaultMessage: 'All' })}
      </RadioPill>
      {options.map(({ label, value }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const radio = getRadioProps({ value } as any);
        return (
          <RadioPill key={value} {...radio} checked={has(filterName, value)}>
            {label}
          </RadioPill>
        );
      })}
    </Wrap>
  );
};

export { RadioFilterGroup };

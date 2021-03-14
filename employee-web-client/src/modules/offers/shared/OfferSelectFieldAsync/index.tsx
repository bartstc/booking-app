import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useAutoComplete } from 'hooks';
import { Currency, OptionType, RequestStatus } from 'types';

import { SelectField, SelectFieldProps } from 'shared/Form/SelectField';

import { IOffer, IOfferCollection } from '../../types';
import { getOffersKey } from '../../infrastructure/query';
import { OfferOption } from './OfferOption';

export type SelectedOfferOption = OptionType<string> & { offer: IOffer };

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable' | 'label' | 'onChangeEffect'> & {
  facilityId: string;
  currency: Currency;
  onChangeEffect?: (option: SelectedOfferOption | null) => void;
};

const OfferSelectFieldAsync = ({ facilityId, onChangeEffect, currency, ...props }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<SelectedOfferOption, IOfferCollection>({
    url: getOffersKey(facilityId)[0],
    params: { currency },
    queryKey: 'name',
    map: ({ collection }) => {
      return collection.map(offer => ({
        label: offer.name,
        value: offer.offerId,
        offer,
      }));
    },
  });

  return (
    <SelectField
      label={<FormattedMessage id='offer' defaultMessage='Offer' />}
      options={data}
      onMenuScrollToBottom={nextPage}
      onInputChange={value => search(value)}
      isLoading={status === RequestStatus.InProgress}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChangeEffect={onChangeEffect as any}
      isClearable
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Option: OfferOption as any,
      }}
      {...props}
    />
  );
};

export { OfferSelectFieldAsync };

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SelectField, SelectFieldProps } from 'react-hook-form-chakra-fields';

import { useAutoComplete } from 'hooks';
import { Currency, OptionType, RequestStatus } from 'types';

import { OfferOption } from './OfferOption';
import { IOffer, IOfferCollection } from '../../../application/types';
import { offersQueryKey } from '../../../infrastructure/query';

export type SelectedOfferOption = OptionType<string> & { offer: IOffer };

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'label' | 'onChangeEffect'> & {
  facilityId: string;
  currency: Currency;
  onChangeEffect?: (option: SelectedOfferOption | null) => void;
};

const OfferSelectFieldAsync = ({ facilityId, onChangeEffect, currency, isClearable = true, ...props }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<SelectedOfferOption, IOfferCollection>({
    url: offersQueryKey(facilityId)[0],
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
      isClearable={isClearable}
      components={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Option: OfferOption as any,
      }}
      {...props}
    />
  );
};

export { OfferSelectFieldAsync };

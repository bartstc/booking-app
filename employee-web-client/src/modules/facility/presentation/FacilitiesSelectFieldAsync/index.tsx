import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SelectField, SelectFieldProps } from 'react-hook-form-chakra-fields';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { IFacilityCollection } from '../../application/types';
import { facilitiesQueryKey } from '../../infrastructure/query';

type IProps = Omit<SelectFieldProps, 'options' | 'onMenuScrollToBottom' | 'isLoading' | 'isClearable' | 'label'> & {
  enterpriseId: string;
};

const FacilitiesSelectFieldAsync = ({ enterpriseId, ...props }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<OptionType<string>, IFacilityCollection>({
    url: facilitiesQueryKey(enterpriseId)[0],
    map: ({ collection }) => {
      return collection.map(facility => ({
        label: facility.name,
        value: facility.facilityId,
      }));
    },
  });

  return (
    <SelectField
      isMulti
      label={<FormattedMessage id='facilities' defaultMessage='Facilities' />}
      options={data}
      onMenuScrollToBottom={nextPage}
      onInputChange={value => search(value)}
      isLoading={status === RequestStatus.InProgress}
      isClearable
      {...props}
    />
  );
};

export { FacilitiesSelectFieldAsync };

import React from 'react';
import { useIntl } from 'react-intl';

import { CurrencyInput, Select, Textarea, TextInput } from 'shared/FormV2';
import { OptionType } from 'shared/FormV2/presentation/Select';

import { BusinessCategoryType } from '../../../application/types';
import { businessCategoryTypeMessages } from '../../../application/messages';

const BaseInfoStepInputs = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <TextInput name='offerName' colSpan={{ base: 6, md: 4 }} isRequired>
        {formatMessage({ id: 'facility-name', defaultMessage: 'Facility name' })}
      </TextInput>
      <TextInput name='slug' colSpan={{ base: 6, md: 4 }} isRequired>
        {formatMessage({ id: 'slug', defaultMessage: 'Slug' })}
      </TextInput>
      <Textarea name='facilityDescription' colSpan={6} isRequired>
        {formatMessage({ id: 'description', defaultMessage: 'Description' })}
      </Textarea>
      <CurrencyInput name='currency' colSpan={{ base: 4, md: 3 }} isRequired />
      <MainBusinessCategorySelect />
      <SubordinateBusinessCategorySelect />
    </>
  );
};

const useBusinessCategoryOptions = () => {
  const { formatMessage } = useIntl();

  return Object.values(BusinessCategoryType).map(
    category =>
      ({
        value: category,
        label: formatMessage({ ...businessCategoryTypeMessages[category] }),
      } as OptionType<string>),
  );
};

const MainBusinessCategorySelect = () => {
  const { formatMessage } = useIntl();
  const categoryOptions = useBusinessCategoryOptions();

  return (
    <Select options={categoryOptions} name='mainBusinessCategory' colSpan={{ base: 6, md: 4 }} colStart={1} isRequired>
      {formatMessage({ id: 'main-business-category', defaultMessage: 'Main business category' })}
    </Select>
  );
};

const SubordinateBusinessCategorySelect = () => {
  const { formatMessage } = useIntl();
  const categoryOptions = useBusinessCategoryOptions();

  return (
    <Select options={categoryOptions} name='subordinateBusinessCategories' colSpan={6} isMulti>
      {formatMessage({ id: 'subordinate-business-category', defaultMessage: 'Subordinate business category' })}
    </Select>
  );
};

export { BaseInfoStepInputs };

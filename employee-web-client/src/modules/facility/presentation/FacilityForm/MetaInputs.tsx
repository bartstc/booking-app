import React from 'react';
import { SimpleGrid, GridItem } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { InputField, OptionType, SelectField } from 'react-hook-form-chakra-fields';

import { SectionTitle } from 'shared/ReadMode';
import { currencyOptions } from 'shared/Form/Builders';

import { BusinessCategoryType } from '../../application/types';
import { businessCategoryTypeMessages } from '../../application/messages';

const MetaInputs = () => {
  const { formatMessage } = useIntl();

  const categoryOptions: OptionType[] = Object.values(BusinessCategoryType).map(category => ({
    value: category,
    label: formatMessage({ ...businessCategoryTypeMessages[category] }),
  }));

  return (
    <SimpleGrid w='100%' columns={4} spacingX={4}>
      <GridItem colSpan={4}>
        <SectionTitle>
          <FormattedMessage id='facility-base-data' defaultMessage='Base facility data' />
        </SectionTitle>
      </GridItem>
      <InputField
        name='facilityName'
        label={<FormattedMessage id='facility-name' defaultMessage='Facility name' />}
        id='facility-name'
        colSpan={{ base: 4, md: 3 }}
      />
      <InputField
        name='slug'
        label={<FormattedMessage id='slug' defaultMessage='Slug' />}
        id='slug'
        colSpan={{ base: 4, md: 3 }}
        tip={
          <FormattedMessage
            id='slug-facility-tip-information'
            defaultMessage='The field identifying the facility. It will be displayed in the url.'
          />
        }
      />
      <InputField
        name='facilityDescription'
        as='textarea'
        label={<FormattedMessage id='description' defaultMessage='Description' />}
        id='facility-description'
        colSpan={4}
      />
      <SelectField
        label={<FormattedMessage id='currency' defaultMessage='Currency' />}
        tip={<FormattedMessage id='currency-facility-tip-information' defaultMessage='The currency valid in facility.' />}
        name='currency'
        id='currency'
        options={currencyOptions}
        colSpan={{ base: 2, md: 2, lg: 1 }}
      />
      <SelectField
        label={<FormattedMessage id='main-business-category' defaultMessage='Main business category' />}
        name='mainBusinessCategory'
        id='main-business-category'
        options={categoryOptions}
        colStart={1}
        colEnd={{ base: 5, md: 4 }}
      />
      <SelectField
        label={<FormattedMessage id='subordinate-business-categories' defaultMessage='Subordinate business categories' />}
        name='subordinateBusinessCategories'
        id='subordinate-business-category'
        options={categoryOptions}
        required={false}
        isMulti
        colSpan={4}
      />
    </SimpleGrid>
  );
};

export { MetaInputs };

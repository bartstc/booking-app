import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { FormattedMessage, useIntl } from 'react-intl';

import { CurrencySelectField, Form, InputField, MoneyField, SelectField } from 'shared/Form';

import { IAddOfferDto } from '../../../dto';
import { PriceModel } from '../../../types';
import { useValidationSchema } from './useValidationSchema';

interface IProps {
  onSubmit: (model: IAddOfferDto) => void;
}

const AddOfferForm = ({ onSubmit }: IProps) => {
  const { formatMessage } = useIntl();
  const schema = useValidationSchema();

  const options = [
    {
      value: PriceModel.Variable,
      label: formatMessage({ id: 'price-model-variable', defaultMessage: 'Variable' }),
    },
    {
      value: PriceModel.Until,
      label: formatMessage({ id: 'price-model-until', defaultMessage: 'Until' }),
    },
    {
      value: PriceModel.Constant,
      label: formatMessage({ id: 'price-model-constant', defaultMessage: 'Constant' }),
    },
    {
      value: PriceModel.Free,
      label: formatMessage({ id: 'price-model-free', defaultMessage: 'Free' }),
    },
  ];

  return (
    <Form<IAddOfferDto>
      id='add-offer-form'
      schema={schema}
      onSubmit={onSubmit}
      defaultValues={{
        offerName: '',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        duration: null as any,
        price: {},
      }}
    >
      <SimpleGrid columns={6} spacingX={4}>
        <InputField name='offerName' label={<FormattedMessage id='offer-name' defaultMessage='Offer name' />} id='offer-name' colSpan={6} />
        <InputField
          type='number'
          name='duration'
          label={<FormattedMessage id='duration-of-offer-min' defaultMessage='Duration of the service (min)' />}
          id='duration'
          colSpan={{ base: 4, md: 3 }}
        />
        <MoneyField
          label={<FormattedMessage id='service-value' defaultMessage={`Service's value`} />}
          name='price.value'
          id='price-value'
          colSpan={{ base: 6, md: 5 }}
        >
          <CurrencySelectField name='price.currency' moneyName='price.value' />
        </MoneyField>
        <SelectField
          options={options}
          label={<FormattedMessage id='price-type' defaultMessage='Price type' />}
          name='price.type'
          id='price-type'
          colSpan={{ base: 4, md: 3 }}
        />
      </SimpleGrid>
    </Form>
  );
};

export { AddOfferForm };

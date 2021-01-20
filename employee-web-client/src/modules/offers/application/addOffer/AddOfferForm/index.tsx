import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
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
      <VStack w='100%' align='flex-start'>
        <InputField name='offerName' label={<FormattedMessage id='offer-name' defaultMessage='Offer name' />} id='offer-name' />
        <Box w='100%' maxW='300px'>
          <InputField
            type='number'
            name='duration'
            label={<FormattedMessage id='duration-of-offer-min' defaultMessage='Duration of the service (min)' />}
            id='duration'
          />
        </Box>
        <Box w='100%' maxW='445px'>
          <MoneyField
            label={<FormattedMessage id='service-value' defaultMessage={`Service's value`} />}
            name='price.value'
            id='price-value'
          >
            <CurrencySelectField name='price.currency' moneyName='price.value' />
          </MoneyField>
        </Box>
        <Box w='100%' maxW='300px'>
          <SelectField
            options={options}
            label={<FormattedMessage id='price-type' defaultMessage='Price type' />}
            name='price.type'
            id='price-type'
          />
        </Box>
      </VStack>
    </Form>
  );
};

export { AddOfferForm };

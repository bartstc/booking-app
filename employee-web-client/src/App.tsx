import React from 'react';
import * as Yup from 'yup';
import { VStack, Box, Heading, HStack } from '@chakra-ui/react';

import {
  DateField,
  Form,
  MaskedInputField,
  SubmitButton,
  ContactSelectField,
  InputField,
  masks,
  SelectField,
  MoneyField,
  CurrencySelectField,
  WithReadMode,
} from './shared/Form';
import { Currency, OptionType } from './types';
import { useRequiredFieldMessage } from './utils/messages';
import { FormattedMessage } from 'react-intl';

const options: OptionType[] = [
  {
    value: 'test1',
    label: 'Test 1',
  },
  {
    value: 'test2',
    label: 'Test 2',
  },
  {
    value: 'test3',
    label: 'Test 3',
  },
  {
    value: 'test4',
    label: 'Test 4',
  },
];

function App() {
  const requiredMsg = useRequiredFieldMessage();
  const schema = Yup.object().shape({
    test1: Yup.string().required(requiredMsg),
    test2: Yup.string().required(requiredMsg),
    money: Yup.string().required(requiredMsg),
    moneyWithCurrency: Yup.object().shape({
      value: Yup.string().required(requiredMsg).nullable(),
      currency: Yup.string().required(requiredMsg).nullable(),
    }),
    date: Yup.string().required(requiredMsg).nullable(),
    select: Yup.string().required(requiredMsg).nullable(),
    multiSelect: Yup.array().required(requiredMsg).nullable(),
    phone: Yup.string()
      .required(requiredMsg)
      .matches(/^[\W\S_]\d{2} \d{9}$/, 'Invalid format'),
  });

  return (
    <Box width='500px' m='0 auto' my={10}>
      <header>
        <Heading as='h2' color='primary.500' mb={6}>
          Booking App
        </Heading>
      </header>
      <Form
        id='test'
        onSubmit={model => alert(JSON.stringify(model, null, 2))}
        schema={schema}
        defaultValues={{
          test1: 'Test value',
          test2: '',
          date: new Date().toISOString(),
          select: null,
          multiSelect: ['test1', 'test2'],
          phone: '',
          money: '',
          moneyWithCurrency: {
            value: '400',
            currency: Currency.Pln,
          },
        }}
      >
        <VStack>
          <InputField name='test1' label='Input field' id='test-field-1' tip='test tip' />
          <InputField name='test2' label='Password field' id='test-field-2' type='password' />
          <DateField name='date' label='Date field' id='test-date-field' />
          <ContactSelectField name='select' id='select' label='Select field' />
          <SelectField options={options} label='Multi select field' name='multiSelect' id='multi-select-field' isMulti={true} />
          <MaskedInputField label='Masked input field' name='phone' id='phone' guide mask={masks.phone} />
          <MoneyField
            label={<FormattedMessage id='money-field-test' defaultMessage={`Money field with currency`} />}
            name='moneyWithCurrency.value'
            id='price-value'
          >
            <CurrencySelectField name='moneyWithCurrency.currency' moneyName='moneyWithCurrency.value' />
          </MoneyField>
          <HStack>
            <WithReadMode>
              <SubmitButton />
            </WithReadMode>
          </HStack>
        </VStack>
      </Form>
    </Box>
  );
}

export default App;

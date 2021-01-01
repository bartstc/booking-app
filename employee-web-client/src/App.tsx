import React from 'react';
import * as Yup from 'yup';
import { VStack, Box } from '@chakra-ui/react';

import { DateField, Form, MaskedInputField, SubmitButton, ContactSelectField, InputField, masks } from './shared/Form';
import { ContactType } from './types';
import { useRequiredFieldMessage } from './messages';

function App() {
  const requiredMsg = useRequiredFieldMessage();
  const schema = Yup.object().shape({
    test1: Yup.string().required(requiredMsg),
    test2: Yup.string().required(requiredMsg),
    date: Yup.string().required(requiredMsg).nullable(true),
    select: Yup.string().required(requiredMsg),
    phone: Yup.string()
      .required(requiredMsg)
      .matches(/^[\W\S_]\d{2} \d{9}$/, 'Invalid format'),
  });

  return (
    <Box maxW='500px' m='0 auto' mt={10}>
      <Form
        onSubmit={model => alert(JSON.stringify(model, null, 2))}
        schema={schema}
        defaultValues={{
          test1: '',
          test2: '',
          date: '',
          select: ContactType.Phone,
          phone: '',
        }}
      >
        <VStack>
          <InputField name='test1' label='Test field 1' id='test-field-1' tip='test tip' />
          <InputField name='test2' label='Test field 2' id='test-field-2' />
          <DateField name='date' label='Test date field' id='test-date-field' />
          <ContactSelectField name='select' id='select' label='Contact field' />
          <MaskedInputField label='Phone number' name='phone' id='phone' guide mask={masks.phone} />
          <SubmitButton />
        </VStack>
      </Form>
    </Box>
  );
}

export default App;

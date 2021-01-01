import React from 'react';
import * as Yup from 'yup';
import { VStack, Box } from '@chakra-ui/react';

import { DateField, Form, SubmitButton } from './shared/Form';
import { InputField } from './shared/Form/InputField';
import { useRequiredFieldMessage } from './shared/Form/messages';

function App() {
  const requiredMsg = useRequiredFieldMessage();
  const schema = Yup.object().shape({
    test1: Yup.string().required(requiredMsg),
    test2: Yup.string().required(requiredMsg),
    date: Yup.string().required(requiredMsg).nullable(true),
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
        }}
      >
        <VStack>
          <InputField name='test1' label='Test field 1' id='test-field-1' tip='test tip' />
          <InputField name='test2' label='Test field 2' id='test-field-2' />
          <DateField name='date' label='Test date field' id='test-date-field' />
          <SubmitButton />
        </VStack>
      </Form>
    </Box>
  );
}

export default App;

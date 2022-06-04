/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { FieldValues, UseFormOptions } from 'react-hook-form';

import { Form } from '../../shared/Form';

// eslint-disable-next-line react/display-name
export const withRHF = (options?: UseFormOptions<FieldValues, object>) => (story: any) => {
  return (
    <Form
      id='storybook-form'
      onSubmit={() => {
        action('submit');
      }}
      {...options}
    >
      {story()}
    </Form>
  );
};

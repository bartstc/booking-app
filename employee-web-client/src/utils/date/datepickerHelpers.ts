/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { dayjs } from 'utils';

type Handler = (value: string | null) => void;
type Value = Date | null;
type Event = React.SyntheticEvent<any> | undefined;
type MapFn = (value: Value, event?: Event) => void;
type InputDateMapper = (handler: Handler, format?: string) => MapFn;

export const mapInputDate: InputDateMapper = (handler, format) => value => {
  if (!value) {
    return handler(null);
  }

  const result = dayjs(value);

  if (!result.isValid()) {
    return;
  }

  handler(result.format(format));
};

export const mapInputTimeDate: InputDateMapper = (handler, format) => value => {
  if (!value) {
    return handler(null);
  }

  const result = dayjs(value);

  if (!result.isValid()) {
    return;
  }

  handler(result.format(format));
};

type OutputDateMapper = (value: string | Date) => Date | null;

export const mapOutputDate: OutputDateMapper = value => (!value ? null : dayjs(value).toDate());

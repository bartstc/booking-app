import React from 'react';
import { isEmpty } from 'lodash';
import formatDate from 'intl-dateformat';

interface IProps {
  value: string | Date;
  format?: string;
}

const FormattedDate = ({ value, format = 'YYYY-MM-DD' }: IProps) => {
  const date = new Date(value);

  if (!isEmpty(value)) {
    return <div>{formatDate(date, format)}</div>;
  }
  return <span>{value}</span>;
};

export { FormattedDate };

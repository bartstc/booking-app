import React from 'react';
import { isEmpty } from 'lodash';
import formatDate from 'intl-dateformat';

interface IProps {
  value: string;
}

const FormattedDate = ({ value }: IProps) => {
  const date = new Date(value);

  if (!isEmpty(value)) {
    return <div>{formatDate(date, 'YYYY-MM-DD')}</div>;
  }
  return <span>{value}</span>;
};

export { FormattedDate };

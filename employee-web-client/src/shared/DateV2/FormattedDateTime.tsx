import React from 'react';
import { FormattedDate } from 'react-intl';
import { chakra } from '@chakra-ui/react';

interface IProps {
  date: string | Date | undefined | null;
  children?: (formattedDate: string) => React.ReactNode;
}

export const FormattedDateTime = ({ date, children }: IProps) => {
  if (!date) {
    return (
      <chakra.div isTruncated>
        <span>---</span>
      </chakra.div>
    );
  }

  return (
    <chakra.div isTruncated>
      <FormattedDate value={date} day='numeric' year='numeric' month='long' hour='2-digit' minute='2-digit' second='2-digit'>
        {children}
      </FormattedDate>
    </chakra.div>
  );
};

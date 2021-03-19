import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { components, OptionProps } from 'react-select';
import { chakra, Divider, Tag, TagLabel, Text, VStack } from '@chakra-ui/react';

import { FormattedDate } from 'shared/Date';

import { IBookingTerm } from '../../../../../types';
import { AvailableEmployeeOption } from './index';

interface EmployeeOptionProps extends OptionProps<AvailableEmployeeOption, false> {}

// eslint-disable-next-line react/display-name
const EmployeeOption = memo(
  (props: EmployeeOptionProps) => {
    const { data } = props;
    const bookingTerm: IBookingTerm | undefined = props.data.bookingTerm;

    const laterAvailableDate = props.data.isAvailable
      ? undefined
      : bookingTerm?.unavailableEmployees.find(unavailableEmployee => unavailableEmployee.employeeId === data.value)?.laterAvailableDate;

    return (
      <components.Option {...props}>
        <VStack spacing={1} align='flex-start' justify='flex-start' width='100%'>
          <p>{props.data.label}</p>
          <div>
            <Tag colorScheme={props.data.isAvailable ? 'green' : 'red'} size='sm'>
              <TagLabel isTruncated width='100%'>
                {props.data.isAvailable ? (
                  <FormattedMessage id='is-available' defaultMessage='Available' />
                ) : (
                  <FormattedMessage id='is-not-available' defaultMessage='Not available' />
                )}
              </TagLabel>
            </Tag>
            {laterAvailableDate && (
              <Text display='flex' fontSize='xs'>
                <FormattedMessage
                  id='later-available-date'
                  defaultMessage='Available from: {date}'
                  values={{
                    date: (
                      <chakra.strong ml={1}>
                        <FormattedDate value={laterAvailableDate} format={'ddd DD MMM HH:mm'} />
                      </chakra.strong>
                    ),
                  }}
                />
              </Text>
            )}
          </div>
          <Divider pt={1} />
        </VStack>
      </components.Option>
    );
  },
  () => false,
);

export { EmployeeOption };

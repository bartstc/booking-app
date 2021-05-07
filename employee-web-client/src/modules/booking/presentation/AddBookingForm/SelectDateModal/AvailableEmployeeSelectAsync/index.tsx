import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, chakra } from '@chakra-ui/react';
import { SelectInput } from 'react-hook-form-chakra-fields';

import { useAutoComplete } from 'hooks';
import { OptionType, RequestStatus } from 'types';

import { EmployeeOption } from './EmployeeOption';
import { IBookingTerm } from '../../../../application/types';
import { employeesQueryKey } from '../../../../../employees/infrastructure/query';
import { IEmployeeCollection } from '../../../../../employees/application/types';

interface IProps {
  bookingTerm?: IBookingTerm;
  facilityId: string;
  selectedEmployeeId: string | undefined;
  setEmployeeId: (id: string) => void;
}

export type AvailableEmployeeOption = OptionType<string> & { bookingTerm: IBookingTerm; isAvailable: boolean };

const AvailableEmployeeSelectAsync = ({ bookingTerm, facilityId, selectedEmployeeId, setEmployeeId }: IProps) => {
  const { data, search, nextPage, status } = useAutoComplete<AvailableEmployeeOption, IEmployeeCollection>({
    url: employeesQueryKey(facilityId)[0],
    limit: 100,
    reFetchWhenChange: [bookingTerm?.date],
    map: ({ collection }) => {
      if (!bookingTerm) return [];

      return collection.map(employee => ({
        label: employee.name,
        value: employee.employeeId,
        bookingTerm,
        isAvailable: bookingTerm.availableEmployeeIds.includes(employee.employeeId),
      }));
    },
  });

  const filteredEmployees = !bookingTerm
    ? []
    : data.filter(
        ({ value }) =>
          bookingTerm.availableEmployeeIds.includes(value) ||
          bookingTerm.unavailableEmployees.some(unavailableEmployee => unavailableEmployee.employeeId === value),
      );

  return (
    <Box w='100%' maxW='350px'>
      <chakra.label opacity={!bookingTerm ? '0.45' : '1'} mb={2} display='block' htmlFor='available-employee-select'>
        <FormattedMessage id='select-available-employee' defaultMessage='Select employee' />
      </chakra.label>
      <SelectInput
        id='available-employee-select'
        isDisabled={!bookingTerm}
        options={filteredEmployees}
        onMenuScrollToBottom={nextPage}
        onInputChange={value => search(value)}
        isLoading={status === RequestStatus.InProgress}
        onChange={option => {
          if (option && typeof (option as OptionType)?.value === 'string') {
            setEmployeeId((option as OptionType).value);
          }
        }}
        value={selectedEmployeeId ? filteredEmployees.find(option => option.value === selectedEmployeeId) : null}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isOptionDisabled={(option: any) => !option.isAvailable}
        isClearable={false}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Option: EmployeeOption as any,
        }}
      />
    </Box>
  );
};

export { AvailableEmployeeSelectAsync };

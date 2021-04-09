import React from 'react';
import { Flex, HStack } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { ContactButtons } from 'shared/Contact';
import { FormattedDate } from 'shared/Date';

import { ContactType } from 'types';

import { StatusActionButtons } from './StatusActionButtons';
import { IEmployee } from '../../../application/types';
import { EmployeeStatusBadge } from '../../EmployeeStatusBadge';

interface IProps {
  index: number;
  employee: IEmployee;
}

const Row = ({ index, employee }: IProps) => {
  const { formatMessage } = useIntl();

  const phone = employee.contacts.find(contact => contact.type === ContactType.Phone)?.value;

  return (
    <GridItem>
      <TruncatedCell>{index}</TruncatedCell>
      <TruncatedCell>{employee.name}</TruncatedCell>
      <Flex display={{ base: 'none', md: 'lex' }} className='cell'>
        <EmployeeStatusBadge status={employee.status} />
      </Flex>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>{employee.position}</TruncatedCell>
      <TruncatedCell>{phone ?? '---'}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>
        <FormattedDate value={employee.birthDate} />
      </TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <HStack spacing={1}>
          <StatusActionButtons employeeId={employee.employeeId} status={employee.status} />
          <ContactButtons contacts={employee.contacts} subject={formatMessage({ id: 'employee', defaultMessage: 'employee' })} />
        </HStack>
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };

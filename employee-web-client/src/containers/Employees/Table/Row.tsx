import React from 'react';
import { Badge, Flex } from '@chakra-ui/react';
import { useIntl } from 'react-intl';

import { GridItem, TruncatedCell } from 'shared/Grid';
import { ContactButtons } from 'shared/Contact';

import { ContactType } from 'types';
import { EmployeeStatus, IEmployee } from 'modules/employees/types';
import { FormattedDate } from '../../../shared/Date';

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
        <Badge variant='solid' colorScheme={employee.status === EmployeeStatus.Active ? 'green' : 'red'}>
          {employee.status}
        </Badge>
      </Flex>
      <TruncatedCell display={{ base: 'none', md: 'flex' }}>{employee.position}</TruncatedCell>
      <TruncatedCell>{phone ?? '---'}</TruncatedCell>
      <TruncatedCell display={{ base: 'none', lg: 'flex' }}>
        <FormattedDate value={employee.birthDate} />
      </TruncatedCell>
      <TruncatedCell justify='flex-end'>
        <ContactButtons contacts={employee.contacts} subject={formatMessage({ id: 'employee', defaultMessage: 'employee' })} />
      </TruncatedCell>
    </GridItem>
  );
};

export { Row };

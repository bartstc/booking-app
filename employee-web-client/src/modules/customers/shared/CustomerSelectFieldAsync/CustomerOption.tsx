import React, { memo } from 'react';
import { components, OptionProps } from 'react-select';
import { Divider, Text, VStack, Tag, TagLabel } from '@chakra-ui/react';

import { ContactType } from 'types';

import { SelectedCustomerOption } from './index';
import { ICustomer } from '../../types';

interface IProps extends OptionProps<SelectedCustomerOption, false> {}

// eslint-disable-next-line react/display-name
const CustomerOption = memo(
  (props: IProps) => {
    const { fullName, address, contacts }: ICustomer = props.data.customer;

    const contact = contacts.find(contact => contact.type === ContactType.Phone) ?? contacts[0];

    return (
      <components.Option {...props}>
        <VStack spacing={1} align='flex-start' justify='flex-start' width='100%'>
          <p>{fullName}</p>
          <div>
            <Text fontSize='xs' mb={1}>
              {address.city} {address.postCode}, {address.street}
            </Text>
            <Tag colorScheme='primary' size='sm'>
              <TagLabel isTruncated width='100%'>
                {contact.value}
              </TagLabel>
            </Tag>
          </div>
          <Divider pt={2} />
        </VStack>
      </components.Option>
    );
  },
  () => false,
);

export { CustomerOption };

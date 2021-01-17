import React from 'react';
import { HStack, Tag, TagLabel } from '@chakra-ui/react';

import { ContactType, IContact } from 'types';

interface IProps {
  contacts: IContact[];
}

const ContactTags = ({ contacts }: IProps) => {
  const phone = contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const email = contacts.find(contact => contact.type === ContactType.Email)?.value;

  return (
    <HStack>
      {phone && (
        <Tag variant='subtle' colorScheme='primary' size='sm'>
          <TagLabel isTruncated width='100%'>
            {phone}
          </TagLabel>
        </Tag>
      )}
      {!phone && email && (
        <Tag variant='subtle' colorScheme='primary' size='sm'>
          <TagLabel isTruncated width='100%'>
            {email}
          </TagLabel>
        </Tag>
      )}
    </HStack>
  );
};

export { ContactTags };

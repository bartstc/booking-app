import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { mdiPhone } from '@mdi/js';
import { StackProps, HStack, IconButton, useColorModeValue } from '@chakra-ui/react';
import Linkify from 'react-linkify';

import { Icon } from 'shared/Icon';
import { Dropdown, DropdownItem } from 'shared/Dropdown';

import { ContactType, IContact } from 'types';

interface IProps extends StackProps {
  contacts: IContact[];
  subject: string;
}

const ContactButtons = ({ contacts, subject, ...props }: IProps) => {
  const phone = contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const email = contacts.find(contact => contact.type === ContactType.Email)?.value;
  const url = contacts.find(contact => contact.type === ContactType.Url)?.value;

  const { formatMessage } = useIntl();
  const iconColor = useColorModeValue('gray.700', 'gray.100');

  const hideMoreButton = !email && !url;

  const callToTitle = formatMessage({
    id: 'call-to',
    defaultMessage: `Call to ${subject}`,
  });

  return (
    <HStack spacing={1} {...props}>
      {phone && (
        <IconButton
          as='a'
          href={`tel:${phone}`}
          color='primary.500'
          aria-label={callToTitle}
          title={callToTitle}
          background='transparent'
          icon={<Icon path={mdiPhone} color={iconColor} />}
        />
      )}
      {!hideMoreButton && (
        <Dropdown>
          {email && (
            <a href={`mailto:${email}`}>
              <DropdownItem>
                <FormattedMessage id='send-email' defaultMessage='Send email message' />
              </DropdownItem>
            </a>
          )}
          {url && (
            <DropdownItem>
              <Linkify
                componentDecorator={href => (
                  <a href={href} target={'_blank'} rel='noopener noreferrer'>
                    <FormattedMessage
                      id='go-to-website'
                      defaultMessage={`Go to {subject}'s website`}
                      values={{
                        subject,
                      }}
                    />
                  </a>
                )}
              >
                {url}
              </Linkify>
            </DropdownItem>
          )}
        </Dropdown>
      )}
    </HStack>
  );
};

export { ContactButtons };

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Linkify from 'react-linkify';

import { Dropdown, DropdownItem } from 'shared/Dropdown';

import { ContactType, IContact } from 'types';

interface IProps {
  contacts: IContact[];
  subject: string;
}

const ContactButtons = ({ contacts, subject }: IProps) => {
  const phone = contacts.find(contact => contact.type === ContactType.Phone)?.value;
  const email = contacts.find(contact => contact.type === ContactType.Email)?.value;
  const url = contacts.find(contact => contact.type === ContactType.Url)?.value;

  return (
    <Dropdown>
      {phone && (
        <a href={`tel:${phone}`}>
          <DropdownItem>
            <FormattedMessage
              id='call-to-subject'
              defaultMessage='Call to {subject}'
              values={{
                subject,
              }}
            />
          </DropdownItem>
        </a>
      )}
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
  );
};

export { ContactButtons };

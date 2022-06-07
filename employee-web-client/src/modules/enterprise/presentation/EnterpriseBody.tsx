import React from 'react';
import { useIntl } from 'react-intl';

import { useEnterpriseContextSelector } from 'modules/context';
import { Divider, Header, Heading, SubHeading } from 'shared/DescriptionListV2';
import { Label, Value, List, IndentLabel, IndentList } from 'shared/IndentiationList';

const EnterpriseBody = () => {
  const { formatMessage } = useIntl();
  const enterprise = useEnterpriseContextSelector(state => state);
  const { contactPerson } = enterprise;

  return (
    <List>
      <IndentLabel>
        <Header>
          <Heading>
            {formatMessage({
              id: 'enterprise-base-data',
              defaultMessage: 'Base information',
            })}
          </Heading>
          <SubHeading>
            {formatMessage({
              id: 'enterprise-base-data-description',
              defaultMessage: 'Base data about enterprise.',
            })}
          </SubHeading>
        </Header>
      </IndentLabel>
      <IndentList>
        <Label>
          {formatMessage({
            id: 'enterprise-name',
            defaultMessage: 'Enterprise name',
          })}
        </Label>
        <Value>{enterprise.enterpriseName}</Value>
        <Label>
          {formatMessage({
            id: 'description',
            defaultMessage: 'Description',
          })}
        </Label>
        <Value>{enterprise.enterpriseDescription}</Value>
        <Label>
          {formatMessage({
            id: 'enterprise-url',
            defaultMessage: 'Website url address',
          })}
        </Label>
        <Value>{enterprise.enterpriseUrl}</Value>
      </IndentList>
      <Divider />
      <IndentLabel>
        <Header>
          <Heading>
            {formatMessage({
              id: 'enterprise-contact-person',
              defaultMessage: 'Contact person',
            })}
          </Heading>
          <SubHeading>
            {formatMessage({
              id: 'contact-person-description-info',
              defaultMessage: 'Data of the person who can be contacted by the booking service administrator.',
            })}
          </SubHeading>
        </Header>
      </IndentLabel>
      <IndentList>
        <Label>
          {formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
        </Label>
        <Value>{contactPerson.name}</Value>
        <Label>
          {formatMessage({
            id: 'phone-number',
            defaultMessage: 'Phone number',
          })}
        </Label>
        <Value>{contactPerson.phone}</Value>
        <Label>
          {formatMessage({
            id: 'email-address',
            defaultMessage: 'Email address',
          })}
        </Label>
        <Value>{contactPerson.email}</Value>
      </IndentList>
    </List>
  );
};

export { EnterpriseBody };

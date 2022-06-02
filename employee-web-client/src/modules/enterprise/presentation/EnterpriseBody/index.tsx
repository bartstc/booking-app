import React from 'react';
import { useIntl } from 'react-intl';

import { useEnterpriseContextSelector } from 'modules/context';
import {
  List,
  Divider,
  IndentationLabel,
  IndentationList,
  IndentLabel,
  IndentValue,
  Header,
  Heading,
  SubHeading,
} from 'shared/DescriptionListV2';

const EnterpriseBody = () => {
  const { formatMessage } = useIntl();
  const enterprise = useEnterpriseContextSelector(state => state);
  const { contactPerson } = enterprise;

  return (
    <List spacingY={4}>
      <IndentationLabel>
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
      </IndentationLabel>
      <IndentationList>
        <IndentLabel>
          {formatMessage({
            id: 'enterprise-name',
            defaultMessage: 'Enterprise name',
          })}
        </IndentLabel>
        <IndentValue>{enterprise.enterpriseName}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'description',
            defaultMessage: 'Description',
          })}
        </IndentLabel>
        <IndentValue>{enterprise.enterpriseDescription}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'enterprise-url',
            defaultMessage: 'Website url address',
          })}
        </IndentLabel>
        <IndentValue>{enterprise.enterpriseUrl}</IndentValue>
      </IndentationList>
      <Divider />
      <IndentationLabel>
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
      </IndentationLabel>
      <IndentationList>
        <IndentLabel>
          {formatMessage({
            id: 'name',
            defaultMessage: 'Name',
          })}
        </IndentLabel>
        <IndentValue>{contactPerson.name}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'phone-number',
            defaultMessage: 'Phone number',
          })}
        </IndentLabel>
        <IndentValue>{contactPerson.phone}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'email-address',
            defaultMessage: 'Email address',
          })}
        </IndentLabel>
        <IndentValue>{contactPerson.email}</IndentValue>
      </IndentationList>
    </List>
  );
};

export { EnterpriseBody };

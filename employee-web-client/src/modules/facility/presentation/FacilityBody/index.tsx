import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

import { Divider, Header, Heading, SubHeading } from 'shared/DescriptionListV2';
import { Value, Label, List, IndentLabel, IndentList } from 'shared/IndentiationList';

import { contactTypeMessages } from 'utils/messages';

import { BusinessCategoryDegreeType, IFacility } from '../../application/types';
import { weekDayMessages } from '../../application/messages';

interface IProps {
  facility: IFacility;
}

const FacilityBody = ({ facility }: IProps) => {
  const { formatMessage } = useIntl();

  const mainBusinessCategory = facility.businessCategories.find(category => category.degree === BusinessCategoryDegreeType.Main)?.type;
  const subordinateBusinessCategories = facility.businessCategories
    .filter(category => category.degree === BusinessCategoryDegreeType.Subordinate)
    .map(category => category.type);
  const address = `${facility.address.postCode}, ${facility.address.city}, ${facility.address.street}`;

  return (
    <List spacingY={4}>
      <IndentLabel>
        <Header>
          <Heading>
            {formatMessage({
              id: 'facility-base-data',
              defaultMessage: 'Base information',
            })}
          </Heading>
          <SubHeading>
            {formatMessage({
              id: 'facility-base-data-description',
              defaultMessage: 'Base data about facility.This fields identifies your facility in the system and on the market.',
            })}
          </SubHeading>
        </Header>
      </IndentLabel>
      <IndentList>
        <Label>
          {formatMessage({
            id: 'facility-name',
            defaultMessage: 'Facility name',
          })}
        </Label>
        <Value>{facility.name}</Value>
        <Label>
          {formatMessage({
            id: 'facility-slug',
            defaultMessage: 'Facility slug',
          })}
        </Label>
        <Value>{facility.slug}</Value>
        <Label>
          {formatMessage({
            id: 'description',
            defaultMessage: 'Description',
          })}
        </Label>
        <Value>{facility.description}</Value>
        <Label>
          {formatMessage({
            id: 'applicable-currency',
            defaultMessage: 'Applicable Currency',
          })}
        </Label>
        <Value textTransform='uppercase'>{facility.currency}</Value>
        <Label>
          {formatMessage({
            id: 'main-business-category',
            defaultMessage: 'Main business category',
          })}
        </Label>
        <Value>{mainBusinessCategory}</Value>
        <Label>
          {formatMessage({
            id: 'subordinate-business-categories',
            defaultMessage: 'Subordinate business categories',
          })}
        </Label>
        <Value>{subordinateBusinessCategories.join(', ')}</Value>
      </IndentList>
      <Divider />
      <IndentLabel>
        <Header>
          <Heading>
            {formatMessage({
              id: 'working-hours',
              defaultMessage: 'Working hours',
            })}
          </Heading>
          <SubHeading>
            {formatMessage({
              id: 'working-hours-description',
              defaultMessage: 'The facility opens during the week.',
            })}
          </SubHeading>
        </Header>
      </IndentLabel>
      <IndentList>
        {facility.workingDays.length > 0
          ? facility.workingDays.map(day => (
              <>
                <Label>{formatMessage(weekDayMessages[day.dayName])}</Label>
                <Value>{day.hours.map(hours => `${hours.until} - ${hours.to}`).join(', ')}</Value>
              </>
            ))
          : '---'}
      </IndentList>
      <Divider />
      <IndentLabel>
        <Header>
          <Heading>
            {formatMessage({
              id: 'facility-contact',
              defaultMessage: 'Facility Contact',
            })}
          </Heading>
          <SubHeading>
            {formatMessage({
              id: 'facility-address-and-contacts-description',
              defaultMessage: 'The exact location of your facility and contact information.',
            })}
          </SubHeading>
        </Header>
      </IndentLabel>
      <IndentList>
        {facility.contacts.map(contact => (
          <Fragment key={contact.type}>
            <Label>{formatMessage(contactTypeMessages[contact.type])}</Label>
            <Value>{contact.value}</Value>
          </Fragment>
        ))}
        <Label>
          {formatMessage({
            id: 'address',
            defaultMessage: 'Address',
          })}
        </Label>
        <Value>{address}</Value>
      </IndentList>
      {facility.contactPerson && (
        <>
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
            <Value>{facility.contactPerson.name}</Value>
            <Label>
              {formatMessage({
                id: 'phone-number',
                defaultMessage: 'Phone number',
              })}
            </Label>
            <Value>{facility.contactPerson.phone}</Value>
            <Label>
              {formatMessage({
                id: 'email-address',
                defaultMessage: 'Email',
              })}
            </Label>
            <Value>{facility.contactPerson.email}</Value>
          </IndentList>
        </>
      )}
    </List>
  );
};

export { FacilityBody };

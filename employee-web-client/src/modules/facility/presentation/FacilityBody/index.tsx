import React, { Fragment } from 'react';
import { useIntl } from 'react-intl';

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
      <IndentationLabel>
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
      </IndentationLabel>
      <IndentationList>
        <IndentLabel>
          {formatMessage({
            id: 'facility-name',
            defaultMessage: 'Facility name',
          })}
        </IndentLabel>
        <IndentValue>{facility.name}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'facility-slug',
            defaultMessage: 'Facility slug',
          })}
        </IndentLabel>
        <IndentValue>{facility.slug}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'description',
            defaultMessage: 'Description',
          })}
        </IndentLabel>
        <IndentValue>{facility.description}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'applicable-currency',
            defaultMessage: 'Applicable Currency',
          })}
        </IndentLabel>
        <IndentValue textTransform='uppercase'>{facility.currency}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'main-business-category',
            defaultMessage: 'Main business category',
          })}
        </IndentLabel>
        <IndentValue>{mainBusinessCategory}</IndentValue>
        <IndentLabel>
          {formatMessage({
            id: 'subordinate-business-categories',
            defaultMessage: 'Subordinate business categories',
          })}
        </IndentLabel>
        <IndentValue>{subordinateBusinessCategories.join(', ')}</IndentValue>
      </IndentationList>
      <Divider />
      <IndentationLabel>
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
      </IndentationLabel>
      <IndentationList>
        {facility.workingDays.length > 0
          ? facility.workingDays.map(day => (
              <>
                <IndentLabel>{formatMessage(weekDayMessages[day.dayName])}</IndentLabel>
                <IndentValue>{day.hours.map(hours => `${hours.until} - ${hours.to}`).join(', ')}</IndentValue>
              </>
            ))
          : '---'}
      </IndentationList>
      <Divider />
      <IndentationLabel>
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
      </IndentationLabel>
      <IndentationList>
        {facility.contacts.map(contact => (
          <Fragment key={contact.type}>
            <IndentLabel>{formatMessage(contactTypeMessages[contact.type])}</IndentLabel>
            <IndentValue>{contact.value}</IndentValue>
          </Fragment>
        ))}
        <IndentLabel>
          {formatMessage({
            id: 'address',
            defaultMessage: 'Address',
          })}
        </IndentLabel>
        <IndentValue>{address}</IndentValue>
      </IndentationList>
      {facility.contactPerson && (
        <>
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
            <IndentValue>{facility.contactPerson.name}</IndentValue>
            <IndentLabel>
              {formatMessage({
                id: 'phone-number',
                defaultMessage: 'Phone number',
              })}
            </IndentLabel>
            <IndentValue>{facility.contactPerson.phone}</IndentValue>
            <IndentLabel>
              {formatMessage({
                id: 'email-address',
                defaultMessage: 'Email',
              })}
            </IndentLabel>
            <IndentValue>{facility.contactPerson.email}</IndentValue>
          </IndentationList>
        </>
      )}
    </List>
  );
};

export { FacilityBody };

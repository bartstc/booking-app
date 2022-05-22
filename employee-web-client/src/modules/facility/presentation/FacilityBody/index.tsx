import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Value,
  ArrayValue,
  SectionTitle,
  SectionHeader,
  SectionSubtitle,
  SectionContainer,
  SectionGrid,
  ValueList,
  SectionGridItem,
  SectionDivider,
} from 'shared/DescriptionList';
import { contactTypeMessages } from 'utils/messages';

import { BusinessCategoryDegreeType, IFacility } from '../../application/types';
import { weekDayMessages } from '../../application/messages';

interface IProps {
  facility: IFacility;
}

const FacilityBody = ({ facility }: IProps) => {
  const mainBusinessCategory = facility.businessCategories.find(category => category.degree === BusinessCategoryDegreeType.Main)?.type;
  const subordinateBusinessCategories = facility.businessCategories
    .filter(category => category.degree === BusinessCategoryDegreeType.Subordinate)
    .map(category => category.type);
  const address = `${facility.address.postCode}, ${facility.address.city}, ${facility.address.street}`;

  return (
    <SectionContainer>
      <SectionGrid>
        <SectionGridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='facility-base-data' defaultMessage='Base information' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage
                id='facility-base-data-description'
                defaultMessage='Base data about facility.This fields identifies your facility in the system and on the market. '
              />
            </SectionSubtitle>
          </SectionHeader>
        </SectionGridItem>
        <SectionGridItem colSpan={{ base: 3, lg: 2 }}>
          <ValueList>
            <Value value={facility.name} label={<FormattedMessage id='facility-name' defaultMessage='Facility name' />} />
            <Value value={facility.slug} label={<FormattedMessage id='facility-slug' defaultMessage='Facility slug' />} />
            <Value value={facility.description} label={<FormattedMessage id='description' defaultMessage='Description' />} />
            <Value
              value={facility.currency.toUpperCase()}
              label={<FormattedMessage id='applicable-currency' defaultMessage='Applicable Currency' />}
            />
            <Value
              value={mainBusinessCategory}
              label={<FormattedMessage id='main-business-category' defaultMessage='Main business category' />}
            />
            <ArrayValue
              label={<FormattedMessage id='subordinate-business-categories' defaultMessage='Subordinate business categories' />}
              value={subordinateBusinessCategories}
            />
          </ValueList>
        </SectionGridItem>
      </SectionGrid>
      <SectionDivider />
      <SectionGrid>
        <SectionGridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='working-hours' defaultMessage='Working hours' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage id='working-hours-description' defaultMessage='The facility opens during the week.' />
            </SectionSubtitle>
          </SectionHeader>
        </SectionGridItem>
        {!!facility.workingDays.length && (
          <SectionGridItem colSpan={{ base: 3, lg: 2 }}>
            <ValueList>
              {facility.workingDays.map(day => (
                <ArrayValue
                  key={day.dayName}
                  label={<FormattedMessage {...weekDayMessages[day.dayName]} />}
                  value={day.hours.map(hours => `${hours.until} - ${hours.to}`)}
                />
              ))}
            </ValueList>
          </SectionGridItem>
        )}
      </SectionGrid>
      <SectionDivider />
      <SectionGrid>
        <SectionGridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionTitle>
            <FormattedMessage id='facility-contact' defaultMessage='Facility Contact' />
          </SectionTitle>
          <SectionSubtitle>
            <FormattedMessage
              id='facility-address-and-contacts-description'
              defaultMessage='The exact location of your facility and contact information.'
            />
          </SectionSubtitle>
        </SectionGridItem>
        <SectionGridItem colSpan={{ base: 3, lg: 2 }}>
          <ValueList>
            {facility.contacts.map(contact => (
              <Value key={contact.value} label={<FormattedMessage {...contactTypeMessages[contact.type]} />} value={contact.value} />
            ))}
            <Value value={address} label={<FormattedMessage id='address' defaultMessage='Address' />} />
          </ValueList>
        </SectionGridItem>
      </SectionGrid>
      {facility.contactPerson && (
        <>
          <SectionDivider />
          <SectionGrid>
            <SectionGridItem colSpan={{ base: 3, lg: 1 }}>
              <SectionTitle>
                <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
              </SectionTitle>
              <SectionSubtitle>
                <FormattedMessage
                  id='contact-person-description-info'
                  defaultMessage='Data of the person who can be contacted by the booking service administrator.'
                />
              </SectionSubtitle>
            </SectionGridItem>
            <SectionGridItem colSpan={{ base: 3, lg: 2 }}>
              <ValueList>
                <Value value={facility.contactPerson.name} label={<FormattedMessage id='name' defaultMessage='Name' />} />
                <Value value={facility.contactPerson.phone} label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />} />
                <Value value={facility.contactPerson.fax} label={<FormattedMessage id='fax-number' defaultMessage='Fax' />} />
                <Value
                  value={facility.contactPerson.email}
                  label={<FormattedMessage id='email-address' defaultMessage='Email address' />}
                />
              </ValueList>
            </SectionGridItem>
          </SectionGrid>
        </>
      )}
    </SectionContainer>
  );
};

export { FacilityBody };

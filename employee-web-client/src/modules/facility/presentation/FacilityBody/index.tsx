import React from 'react';
import { GridItem, VStack, Divider } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import {
  ReadModeValue,
  ReadModeArrayValue,
  SectionTitle,
  SectionHeader,
  SectionSubtitle,
  SectionContainer,
  SectionGrid,
} from 'shared/ReadMode';
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
        <GridItem colSpan={{ base: 3, lg: 1 }}>
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
        </GridItem>
        <GridItem as={VStack} spacing={4} align='flex-start' colSpan={{ base: 3, lg: 2 }}>
          <ReadModeValue value={facility.name} label={<FormattedMessage id='facility-name' defaultMessage='Facility name' />} />
          <ReadModeValue value={facility.slug} label={<FormattedMessage id='facility-slug' defaultMessage='Facility slug' />} />
          <ReadModeValue value={facility.description} label={<FormattedMessage id='description' defaultMessage='Description' />} />
          <ReadModeValue
            value={facility.currency.toUpperCase()}
            label={<FormattedMessage id='applicable-currency' defaultMessage='Applicable Currency' />}
          />
          <ReadModeValue
            value={mainBusinessCategory}
            label={<FormattedMessage id='main-business-category' defaultMessage='Main business category' />}
          />
          <ReadModeArrayValue
            label={<FormattedMessage id='subordinate-business-categories' defaultMessage='Subordinate business categories' />}
            value={subordinateBusinessCategories}
          />
        </GridItem>
      </SectionGrid>
      <Divider />
      <SectionGrid>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='working-hours' defaultMessage='Working hours' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage id='working-hours-description' defaultMessage='The facility opens during the week.' />
            </SectionSubtitle>
          </SectionHeader>
        </GridItem>
        {!!facility.workingDays.length && (
          <GridItem as={VStack} spacing={4} align='flex-start' colSpan={{ base: 3, lg: 2 }}>
            {facility.workingDays.map(day => (
              <ReadModeArrayValue
                key={day.dayName}
                label={<FormattedMessage {...weekDayMessages[day.dayName]} />}
                value={day.hours.map(hours => `${hours.until} - ${hours.to}`)}
              />
            ))}
          </GridItem>
        )}
      </SectionGrid>
      <Divider />
      <SectionGrid>
        <GridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionTitle>
            <FormattedMessage id='facility-contact' defaultMessage='Facility Contact' />
          </SectionTitle>
          <SectionSubtitle>
            <FormattedMessage
              id='facility-address-and-contacts-description'
              defaultMessage='The exact location of your facility and contact information.'
            />
          </SectionSubtitle>
        </GridItem>
        <GridItem as={VStack} spacing={4} align='flex-start' colSpan={{ base: 3, lg: 2 }}>
          {facility.contacts.map(contact => (
            <ReadModeValue key={contact.value} label={<FormattedMessage {...contactTypeMessages[contact.type]} />} value={contact.value} />
          ))}
          <ReadModeValue value={address} label={<FormattedMessage id='address' defaultMessage='Address' />} />
        </GridItem>
      </SectionGrid>
      {facility.contactPerson && (
        <>
          <Divider />
          <SectionGrid>
            <GridItem colSpan={{ base: 3, lg: 1 }}>
              <SectionTitle>
                <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
              </SectionTitle>
              <SectionSubtitle>
                <FormattedMessage
                  id='contact-person-description-info'
                  defaultMessage='Data of the person who can be contacted by the booking service administrator.'
                />
              </SectionSubtitle>
            </GridItem>
            <GridItem as={VStack} spacing={4} align='flex-start' colSpan={{ base: 3, lg: 2 }}>
              <ReadModeValue value={facility.contactPerson.name} label={<FormattedMessage id='name' defaultMessage='Name' />} />
              <ReadModeValue
                value={facility.contactPerson.phone}
                label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />}
              />
              <ReadModeValue value={facility.contactPerson.fax} label={<FormattedMessage id='fax-number' defaultMessage='Fax' />} />
              <ReadModeValue
                value={facility.contactPerson.email}
                label={<FormattedMessage id='email-address' defaultMessage='Email address' />}
              />
            </GridItem>
          </SectionGrid>
        </>
      )}
    </SectionContainer>
  );
};

export { FacilityBody };

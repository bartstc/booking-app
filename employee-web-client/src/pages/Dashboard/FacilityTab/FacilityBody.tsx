import React from 'react';
import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';

import { ReadModeArrayValue, ReadModeValue, SectionTitle } from 'shared/ReadMode';
import { BusinessCategoryDegreeType, IFacility } from 'modules/facility/types';
import { weekDayMessages } from 'modules/facility/messages';
import { contactTypeMessages } from 'utils/messages';

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
    <SimpleGrid w='100%' columns={2} spacingY={{ base: 8, md: 0 }} spacingX={{ md: 8, lg: 14 }}>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <SectionTitle>
          <FormattedMessage id='enterprise-base-data' defaultMessage='Base facility data' />
        </SectionTitle>
        <VStack spacing={4} align='flex-start'>
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
        </VStack>
        <SectionTitle mt={8}>
          <FormattedMessage id='working-hours' defaultMessage='Working hours' />
        </SectionTitle>
        {!!facility.workingDays.length && (
          <VStack spacing={4} align='flex-start'>
            {facility.workingDays.map(day => (
              <ReadModeArrayValue
                key={day.dayName}
                label={<FormattedMessage {...weekDayMessages[day.dayName]} />}
                value={day.hours.map(hours => `${hours.until} - ${hours.to}`)}
              />
            ))}
          </VStack>
        )}
      </GridItem>
      <GridItem colSpan={{ base: 2, md: 1 }}>
        <SectionTitle>
          <FormattedMessage id='facility-contact' defaultMessage='Facility Contact' />
        </SectionTitle>
        {!!facility.contacts.length && (
          <VStack spacing={4} align='flex-start'>
            {facility.contacts.map(contact => (
              <ReadModeValue
                key={contact.value}
                label={<FormattedMessage {...contactTypeMessages[contact.type]} />}
                value={contact.value}
              />
            ))}
          </VStack>
        )}
        <ReadModeValue mt={4} value={address} label={<FormattedMessage id='address' defaultMessage='Address' />} />{' '}
        {facility.contactPerson && (
          <>
            <SectionTitle mt={8}>
              <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
            </SectionTitle>
            <VStack spacing={4} align='flex-start'>
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
            </VStack>
          </>
        )}
      </GridItem>
    </SimpleGrid>
  );
};

export { FacilityBody };

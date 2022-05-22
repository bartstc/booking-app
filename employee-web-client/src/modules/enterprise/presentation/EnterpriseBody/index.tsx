import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useEnterpriseContextSelector } from 'modules/context';
import {
  Value,
  SectionTitle,
  SectionHeader,
  SectionSubtitle,
  SectionContainer,
  SectionGrid,
  SectionGridItem,
  ValueList,
  SectionDivider,
} from 'shared/DescriptionList';

const EnterpriseBody = () => {
  const enterprise = useEnterpriseContextSelector(state => state);

  return (
    <SectionContainer>
      <SectionGrid>
        <SectionGridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='enterprise-base-data' defaultMessage='Base information' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage id='enterprise-base-data-description' defaultMessage='Base data about enterprise.' />
            </SectionSubtitle>
          </SectionHeader>
        </SectionGridItem>
        <SectionGridItem colSpan={{ base: 3, lg: 2 }}>
          <ValueList>
            <Value value={enterprise.enterpriseName} label={<FormattedMessage id='enterprise-name' defaultMessage='Enterprise name' />} />
            <Value value={enterprise.enterpriseDescription} label={<FormattedMessage id='description' defaultMessage='Description' />} />
            <Value value={enterprise.enterpriseUrl} label={<FormattedMessage id='enterprise-url' defaultMessage='Website url address' />} />
          </ValueList>
        </SectionGridItem>
      </SectionGrid>
      <SectionDivider />
      <SectionGrid>
        <SectionGridItem colSpan={{ base: 3, lg: 1 }}>
          <SectionHeader>
            <SectionTitle>
              <FormattedMessage id='enterprise-contact-person' defaultMessage='Contact person' />
            </SectionTitle>
            <SectionSubtitle>
              <FormattedMessage
                id='contact-person-description-info'
                defaultMessage='Data of the person who can be contacted by the booking service administrator.'
              />
            </SectionSubtitle>
          </SectionHeader>
        </SectionGridItem>
        <SectionGridItem colSpan={{ base: 3, lg: 2 }}>
          <ValueList>
            <Value value={enterprise.contactPerson.name} label={<FormattedMessage id='name' defaultMessage='Name' />} />
            <Value value={enterprise.contactPerson.phone} label={<FormattedMessage id='phone-number' defaultMessage='Phone number' />} />
            <Value value={enterprise.contactPerson.fax} label={<FormattedMessage id='fax-number' defaultMessage='Fax' />} />
            <Value value={enterprise.contactPerson.email} label={<FormattedMessage id='email-address' defaultMessage='Email address' />} />
          </ValueList>
        </SectionGridItem>
      </SectionGrid>
    </SectionContainer>
  );
};

export { EnterpriseBody };

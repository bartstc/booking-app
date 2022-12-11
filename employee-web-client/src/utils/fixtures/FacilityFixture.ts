import { createFixture } from './fixture';
import { BusinessCategoryDegreeType, BusinessCategoryType, IFacility, WeekDay } from '../../modules/facility/application/types';
import { ContactType, Currency } from '../../types';

export const FacilityFixture = createFixture<IFacility>({
  facilityId: '1',
  enterpriseId: '',
  slug: 'hardcut-barber',
  currency: Currency.Eu,
  name: 'Hardcut Barber',
  description: 'Lorem ipsum dolor',
  address: {
    city: 'Gdynia',
    postCode: '80-800',
    street: 'Groove Street',
  },
  workingDays: [
    {
      dayName: WeekDay.Monday,
      hours: [{ until: '09.00', to: '17.00' }],
    },
  ],
  businessCategories: [
    { degree: BusinessCategoryDegreeType.Main, type: BusinessCategoryType.Barber },
    { degree: BusinessCategoryDegreeType.Subordinate, type: BusinessCategoryType.Hairdresser },
  ],
  contacts: [
    {
      type: ContactType.Email,
      value: 'hardcutbarber.test.com',
    },
  ],
});

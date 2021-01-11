import {
  BuildFacilityDto,
  FacilityMap,
} from '../../src/modules/facilities/adapter';
import { UniqueEntityID } from '../../src/shared/domain';
import { Facility } from '../../src/modules/facilities/domain';
import { ContactType } from '../../src/shared/domain/types';
import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
  WeekDay,
} from '../../src/modules/facilities/domain/types';

interface Props {
  facilityId?: UniqueEntityID;
  enterpriseId?: UniqueEntityID;
  dto?: Partial<BuildFacilityDto>;
}

const defaultDto: BuildFacilityDto = {
  facilityName: 'Google',
  slug: 'google',
  address: {
    street: 'Groove Street',
    postCode: '33-444',
    city: 'New York',
    countryCode: 'US',
    province: 'test',
  },
  contacts: [
    {
      type: ContactType.Url,
      value: 'www.google.com',
    },
  ],
  businessCategories: [
    {
      degree: BusinessCategoryDegreeType.Main,
      type: BusinessCategoryType.Psychotherapy,
    },
  ],
  availability: [
    {
      dayName: WeekDay.Sunday,
      hours: [
        {
          until: '10:00',
          to: '18:00',
        },
      ],
    },
  ],
};

export const createFacility = ({
  dto = {},
  enterpriseId = new UniqueEntityID(),
  facilityId = new UniqueEntityID(),
}: Props): Facility => {
  return FacilityMap.dtoToDomain(
    { ...defaultDto, ...dto },
    enterpriseId.toString(),
    facilityId.toString(),
  ).getValue();
};

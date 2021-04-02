import { omit } from 'lodash';

import { BusinessCategoryDegreeType, IFacility, CreateFacilityDto, CreateFacilityFormDto } from './types';

export const CreateFacilityMapper = {
  formToDto(form: CreateFacilityFormDto): CreateFacilityDto {
    return {
      ...(omit(form, ['mainBusinessCategory', 'subordinateBusinessCategories']) as CreateFacilityFormDto),
      businessCategories: [
        {
          type: form.mainBusinessCategory,
          degree: BusinessCategoryDegreeType.Main,
        },
        ...(form.subordinateBusinessCategories ?? []).map(category => ({
          type: category,
          degree: BusinessCategoryDegreeType.Subordinate,
        })),
      ],
      availability: form.availability.map(availability => ({
        dayName: availability.dayName,
        hours: [availability.hours],
      })),
    };
  },
  modelToForm(facility: IFacility): CreateFacilityFormDto {
    const mainBusinessCategory = facility.businessCategories.find(category => category.degree === BusinessCategoryDegreeType.Main);
    const subordinateBusinessCategories = facility.businessCategories.filter(
      category => category.degree === BusinessCategoryDegreeType.Subordinate,
    );

    return {
      ...omit(facility, ['enterpriseId', 'facilityId', 'name', 'description']),
      facilityName: facility.name,
      facilityDescription: facility.description!,
      mainBusinessCategory: mainBusinessCategory!.type,
      subordinateBusinessCategories: subordinateBusinessCategories.map(category => category.type),
      availability: facility.workingDays.map(workingDay => ({
        dayName: workingDay.dayName,
        hours: workingDay.hours[0],
      })),
    };
  },
};

import { CreateFacilityDto } from './CreateFacilityDto';
import { BusinessCategoryType } from './BusinessCategoryType';
import { WeekDay } from './WeekDay';
import { IWorkingHours } from './IWorkingHours';

export interface CreateFacilityFormDto extends Omit<CreateFacilityDto, 'businessCategories' | 'availability'> {
  mainBusinessCategory: BusinessCategoryType;
  subordinateBusinessCategories?: BusinessCategoryType[];
  availability: Array<{ dayName: WeekDay; hours: IWorkingHours }>;
}

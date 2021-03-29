import { ICreateFacilityDto } from '../../../dto';
import { BusinessCategoryType, IWorkingHours, WeekDay } from '../../../types';

export interface ICreateFacilityFormDto extends Omit<ICreateFacilityDto, 'businessCategories' | 'availability'> {
  mainBusinessCategory: BusinessCategoryType;
  subordinateBusinessCategories?: BusinessCategoryType[];
  availability: Array<{ dayName: WeekDay; hours: IWorkingHours }>;
}

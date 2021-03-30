import { BusinessCategoryType, IWorkingHours, WeekDay } from '../../types';
import { ICreateFacilityDto } from './ICreateFacilityDto';

export interface ICreateFacilityFormDto extends Omit<ICreateFacilityDto, 'businessCategories' | 'availability'> {
  mainBusinessCategory: BusinessCategoryType;
  subordinateBusinessCategories?: BusinessCategoryType[];
  availability: Array<{ dayName: WeekDay; hours: IWorkingHours }>;
}

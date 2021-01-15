import { BusinessCategoryType } from './BusinessCategoryType';
import { BusinessCategoryDegreeType } from './BusinessCategoryDegreeType';

export interface IBusinessCategory {
  type: BusinessCategoryType;
  degree: BusinessCategoryDegreeType;
}

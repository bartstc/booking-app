import { ApiProperty } from '@nestjs/swagger';

import {
  BusinessCategoryDegreeType,
  BusinessCategoryType,
} from '../../domain/types';

export class BusinessCategoryDto {
  @ApiProperty({ enum: BusinessCategoryType })
  type: BusinessCategoryType;

  @ApiProperty({ enum: BusinessCategoryDegreeType })
  degree: BusinessCategoryDegreeType;
}

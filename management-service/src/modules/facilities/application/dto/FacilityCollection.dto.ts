import { ApiProperty } from '@nestjs/swagger';

import { MetaDto } from 'shared/core/dto';

import { FacilityDto } from './Facility.dto';

export class FacilityCollectionDto {
  @ApiProperty({ type: [FacilityDto] })
  collection: FacilityDto[];

  @ApiProperty()
  meta: MetaDto;
}

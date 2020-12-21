import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty()
  offset: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  total: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class DictionaryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  value: string;
}

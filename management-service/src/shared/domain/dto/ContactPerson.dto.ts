import { ApiProperty } from '@nestjs/swagger';

export class ContactPersonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  fax: string;

  @ApiProperty()
  email: string;
}

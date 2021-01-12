import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  postCode: string;

  @ApiProperty()
  street: string;
}

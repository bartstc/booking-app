import {ApiProperty} from "@nestjs/swagger";

export class AddressDto {
  @ApiProperty()
  city: string;

  @ApiProperty()
  countryCode: string;

  @ApiProperty()
  flatNumber: string | null;

  @ApiProperty()
  houseNumber: string;

  @ApiProperty()
  postCode: string;

  @ApiProperty()
  province: string;

  @ApiProperty()
  street: string;
}

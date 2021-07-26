import { ApiProperty } from '@nestjs/swagger';
import { BuildEmployeeDto } from '../../../adapter';

export class AddEmployeeDto extends BuildEmployeeDto {
  @ApiProperty()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { ContextType } from 'shared/domain';

export class EmployeeScopeDto {
  @ApiProperty()
  employeeScopeId: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  enterpriseId: string;

  @ApiProperty({ enum: ContextType })
  contextType: ContextType.Employee;

  @ApiProperty({ isArray: true })
  facilityIds: Array<string>;

  @ApiProperty({ nullable: true })
  activeFacilityId: string | null;
}

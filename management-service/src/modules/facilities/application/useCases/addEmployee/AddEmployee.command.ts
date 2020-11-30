import { AddEmployeeDto } from './AddEmployee.dto';

export class AddEmployeeCommand {
  constructor(
    public readonly dto: AddEmployeeDto,
    public readonly facilityId: string,
  ) {}
}

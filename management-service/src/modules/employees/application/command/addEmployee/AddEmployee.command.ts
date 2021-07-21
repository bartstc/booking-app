import { AddEmployeeDto } from './AddEmployee.dto';

export class AddEmployeeCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly dto: AddEmployeeDto,
  ) {}
}

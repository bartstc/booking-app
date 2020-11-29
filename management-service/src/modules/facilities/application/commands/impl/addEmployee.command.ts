import { AddEmployeeDto } from '../../useCases/addEmployee';

export class AddEmployeeCommand {
  constructor(
    public readonly dto: AddEmployeeDto,
    public readonly facilityId: string,
  ) {}
}

import { CreateOwnerEmployeeDto } from './CreateOwnerEmployee.dto';

export class CreateOwnerEmployeeCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly dto: CreateOwnerEmployeeDto,
  ) {}
}

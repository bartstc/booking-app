import { RemoveEmployeeDto } from '../../useCases/removeEmployee';

export class RemoveEmployeeCommand {
  constructor(public readonly dto: RemoveEmployeeDto) {}
}

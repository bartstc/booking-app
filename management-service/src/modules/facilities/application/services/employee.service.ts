import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AddEmployeeCommand, RemoveEmployeeCommand } from '../commands/impl';
import { AddEmployeeDto } from '../useCases/addEmployee';
import { RemoveEmployeeDto } from '../useCases/removeEmployee';

@Injectable()
export class EmployeeService {
  constructor(private readonly commandBus: CommandBus) {}

  async addEmployee(dto: AddEmployeeDto, facilityId: string) {
    return this.commandBus.execute(new AddEmployeeCommand(dto, facilityId));
  }

  async removeEmployee(dto: RemoveEmployeeDto) {
    return this.commandBus.execute(new RemoveEmployeeCommand(dto));
  }
}

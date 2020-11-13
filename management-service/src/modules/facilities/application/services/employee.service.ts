import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AddEmployeeCommand } from '../commands/impl';
import { AddEmployeeDto } from '../useCases/addEmployee';

@Injectable()
export class EmployeeService {
  constructor(private readonly commandBus: CommandBus) {}

  async addEmployee(dto: AddEmployeeDto, facilityId: string) {
    return this.commandBus.execute(new AddEmployeeCommand(dto, facilityId));
  }
}

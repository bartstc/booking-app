import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { AddCustomerDto } from '../useCases/addCustomer';
import { AddCustomerCommand, DeleteCustomerCommand } from '../commands/impl';
import { DeleteCustomerDto } from '../useCases/deleteCustomer';

@Injectable()
export class CustomerService {
  constructor(private readonly commandBus: CommandBus) {}

  async addCustomer(dto: AddCustomerDto, facilityId: string) {
    return this.commandBus.execute(new AddCustomerCommand(dto, facilityId));
  }

  async deleteCustomer(dto: DeleteCustomerDto) {
    return this.commandBus.execute(new DeleteCustomerCommand(dto));
  }
}

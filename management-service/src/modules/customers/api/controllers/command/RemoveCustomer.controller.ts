import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { Controller, Delete, Inject, Param, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  RemoveCustomerCommand,
  RemoveCustomerErrors,
} from 'modules/customers/application/command/removeCustomer';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class RemoveCustomerController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.CustomersLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Delete('facilities/:facilityId/customers/:customerId')
  @ApiTags('Customers')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async deleteCustomer(
    @Param('customerId') customerId: string,
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.commandBus.execute(
        new RemoveCustomerCommand(facilityId, customerId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case RemoveCustomerErrors.FacilityNotFoundError:
          case RemoveCustomerErrors.CustomerNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Customer successfully removed');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}

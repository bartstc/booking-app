import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';

import { BaseController, ValidationTransformer } from 'shared/core';

import { AddCustomerDto } from './AddCustomer.dto';
import { AddCustomerErrors } from './AddCustomer.errors';
import { addCustomerSchema } from './AddCustomer.schema';
import { AddCustomerCommand } from './AddCustomer.command';

@Controller()
export class AddCustomerController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  logger = new Logger('AddCustomerController');

  @Post('facilities/:facilityId/customers')
  async addCustomer(
    @Param('facilityId') facilityId: string,
    @Body() dto: AddCustomerDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        addCustomerSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result = await this.commandBus.execute(
        new AddCustomerCommand(dto, facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case AddCustomerErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Customer successfully added');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

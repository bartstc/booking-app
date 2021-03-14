import { Body, Controller, Inject, Param, Post, Res } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  AddCustomerDto,
  AddCustomerErrors,
  AddCustomerCommand,
  AddCustomerResponse,
} from 'modules/customers/application/command/addCustomer';

import { addCustomerSchema } from '../../schemas';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class AddCustomerController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.CustomersLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Post('facilities/:facilityId/customers')
  @ApiTags('Customers')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Facility not found' })
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

      const result: AddCustomerResponse = await this.commandBus.execute(
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

      this.logger.log('Customer successfully added');
      return this.ok(res, {
        customerId: result.value.getValue().customerId.id.toString(),
      });
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}

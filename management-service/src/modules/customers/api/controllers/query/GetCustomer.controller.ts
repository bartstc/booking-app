import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import { CustomerDto } from 'modules/customers/application/dto';
import {
  GetCustomerErrors,
  GetCustomerQuery,
} from 'modules/customers/application/query/getCustomer';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetCustomerController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.CustomersLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('facilities/:facilityId/customers/:customerId')
  @ApiTags('Customers')
  @ApiOkResponse({ type: CustomerDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Customer not found' })
  async getCustomer(
    @Param('facilityId') facilityId: string,
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.queryBus.execute(
        new GetCustomerQuery(customerId, facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetCustomerErrors.CustomerDoesNotExistError:
          case GetCustomerErrors.FacilityDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Customer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}

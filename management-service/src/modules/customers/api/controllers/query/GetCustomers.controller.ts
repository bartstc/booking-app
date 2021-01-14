import { Controller, Get, Logger, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import { GetCustomersQuery } from 'modules/customers/application/query/getCustomers';
import { CustomerCollectionDto } from 'modules/customers/application/dto';

import { CustomerCollectionQueryParams } from '../../../adapter/params';

@Controller()
export class GetCustomersController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetCustomersController');

  @Get('facilities/:facilityId/customers')
  @ApiTags('Customers')
  @ApiOkResponse({ type: CustomerCollectionDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'query', type: 'string', required: false })
  async getCustomers(
    @Param('facilityId') facilityId: string,
    @Query() params: CustomerCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const result = await this.queryBus.execute(
        new GetCustomersQuery(facilityId, params),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Customers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

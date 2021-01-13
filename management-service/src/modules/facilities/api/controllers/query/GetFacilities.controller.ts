import { Controller, Get, Logger, Param, Query, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import { FacilityCollectionDto } from '../../../application/dto';
import { FacilityCollectionQueryParams } from '../../../adapter/params';
import {
  GetFacilitiesErrors,
  GetFacilitiesQuery,
  GetFacilitiesResponse,
} from '../../../application/query/getFacilities';

@Controller()
export class GetFacilitiesController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetFacilitiesController');

  @Get('enterprises/:enterpriseId/facilities')
  @ApiTags('Facilities')
  @ApiOkResponse({ type: FacilityCollectionDto })
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  @ApiQuery({ name: 'offset', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'name', type: 'string', required: false })
  async getFacilities(
    @Param('enterpriseId') enterpriseId: string,
    @Query() params: FacilityCollectionQueryParams,
    @Res() res: Response,
  ) {
    try {
      const result: GetFacilitiesResponse = await this.queryBus.execute(
        new GetFacilitiesQuery(enterpriseId, params),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetFacilitiesErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Facilities successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

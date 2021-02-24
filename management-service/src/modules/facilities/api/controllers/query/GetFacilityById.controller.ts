import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';
import { FacilityDto } from 'modules/facilities/application/dto';
import {
  GetFacilityByIdResponse,
  GetFacilityByIdQuery,
  GetFacilityByIdErrors,
} from 'modules/facilities/application/query/getFacilityById';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetFacilityByIdController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('facilities/:facilityId')
  @ApiTags('Facilities')
  @ApiOkResponse({ type: FacilityDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getFacility(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetFacilityByIdResponse = await this.queryBus.execute(
        new GetFacilityByIdQuery(facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetFacilityByIdErrors.FacilityDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Facility successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}

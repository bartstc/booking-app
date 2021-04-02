import { Controller, Get, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { FacilityDto } from 'modules/facilities/application/dto';
import {
  GetFacilityBySlugQuery,
  GetFacilityBySlugResponse,
  GetFacilityBySlugErrors,
} from 'modules/facilities/application/query/getFacilityBySlug';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class GetFacilityBySlugController extends BaseController {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject(InfrastructureKeys.FacilitiesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Get('facilities/slug/:slug')
  @ApiTags('Facilities')
  @ApiOkResponse({ type: FacilityDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getFacility(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const result: GetFacilityBySlugResponse = await this.queryBus.execute(
        new GetFacilityBySlugQuery(slug),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetFacilityBySlugErrors.FacilityDoesNotExistError:
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

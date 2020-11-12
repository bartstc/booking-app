import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { FacilityService } from '../../services';
import { CreateFacilityDto } from './createFacility.dto';
import { CreateFacilityResponse } from './createFacility.case';

@Controller()
export class CreateFacilityController extends BaseController {
  constructor(private readonly facilityService: FacilityService) {
    super();
  }

  logger = new Logger('CreateFacilityController');

  @Post('enterprises/:enterpriseId/facilities')
  async createFacility(
    @Param('enterpriseId') enterpriseId: string,
    @Body() dto: CreateFacilityDto,
    @Res() res: Response,
  ) {
    try {
      // const formErrors = await ValidationTransformer.validateSchema(
      //   dto,
      //   createEnterpriseSchema,
      // );

      // if (formErrors.isLeft()) {
      //   return this.clientError(res, formErrors.value.errorValue());
      // }

      const result: CreateFacilityResponse = await this.facilityService.createFacility(
        dto,
        enterpriseId,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.getValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Facility successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

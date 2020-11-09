import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';
import { GetFacilityCase } from './getFacility.case';
import { GetFacilityErrors } from './getFacility.errors';

@Controller()
export class GetFacilityController extends BaseController {
  constructor(private readonly getFacilityCase: GetFacilityCase) {
    super();
  }

  private logger = new Logger('GetFacilityController');

  @Get('facilities/:facilityId')
  async getEnterprise(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.getFacilityCase.execute(facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetFacilityErrors.FacilityDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Facility successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

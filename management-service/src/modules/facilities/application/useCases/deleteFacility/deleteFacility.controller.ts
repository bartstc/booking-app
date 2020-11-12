import { Response } from 'express';
import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';

import { BaseController } from 'shared/core';

import { FacilityService } from '../../services';
import { DeleteFacilityResponse } from './deleteFacility.case';
import { DeleteFacilityErrors } from './deleteFacility.errors';

@Controller()
export class DeleteFacilityController extends BaseController {
  constructor(private readonly service: FacilityService) {
    super();
  }

  logger = new Logger('DeleteFacilityController');

  @Delete('facilities/:facilityId')
  async deleteFacility(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result: DeleteFacilityResponse = await this.service.deleteFacility({
        facilityId,
      });

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case DeleteFacilityErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Facility successfully deleted');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';
import { GetOffersCase } from './getOffers.case';

@Controller()
export class GetOffersController extends BaseController {
  constructor(private readonly getOffersCase: GetOffersCase) {
    super();
  }

  private logger = new Logger('GetOffersController');

  @Get('facilities/:facilityId/offers')
  async getOffers(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.getOffersCase.execute(facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Offers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

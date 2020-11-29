import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { GetOfferCase } from './getOffer.case';
import { GetOfferErrors } from './getOffer.errors';

@Controller()
export class GetOfferController extends BaseController {
  constructor(private readonly getOfferCase: GetOfferCase) {
    super();
  }

  private logger = new Logger('GetOfferController');

  @Get('facilities/:facilityId/offers/:offerId')
  async getOffer(@Param('offerId') offerId: string, @Res() res: Response) {
    try {
      const result = await this.getOfferCase.execute(offerId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetOfferErrors.OfferDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

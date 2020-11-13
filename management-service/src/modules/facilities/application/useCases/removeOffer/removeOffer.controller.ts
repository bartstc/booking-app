import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { OfferService } from '../../services';
import { RemoveOfferResponse } from './removeOffer.case';
import { RemoveOfferErrors } from './removeOffer.errors';

@Controller()
export class RemoveOfferController extends BaseController {
  constructor(private readonly service: OfferService) {
    super();
  }

  logger = new Logger('RemoveOfferController');

  @Delete('facilities/:facilityId/offers/:offerId')
  async deleteFacility(
    @Param('facilityId') facilityId: string,
    @Param('offerId') offerId: string,
    @Res() res: Response,
  ) {
    try {
      const result: RemoveOfferResponse = await this.service.removeOffer({
        facilityId,
        offerId,
      });

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case RemoveOfferErrors.OfferNotFoundError:
          case RemoveOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully removed');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

import { Body, Controller, Logger, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController, ValidationTransformer } from 'shared/core';

import { OfferService } from '../../services';
import { AddOfferDto } from './addOffer.dto';
import { AddOfferResponse } from './addOffer.case';
import { AddOfferErrors } from './addOffer.errors';
import { addOfferSchema } from './addOffer.schema';

@Controller()
export class AddOfferController extends BaseController {
  constructor(private readonly offerService: OfferService) {
    super();
  }

  logger = new Logger('AddOfferController');

  @Post('facilities/:facilityId/offers')
  async addOffer(
    @Param('facilityId') facilityId: string,
    @Body() dto: AddOfferDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        addOfferSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: AddOfferResponse = await this.offerService.addOffer(
        dto,
        facilityId,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.getValue());

        switch (error.constructor) {
          case AddOfferErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully added');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

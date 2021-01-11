import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { OfferDto } from 'modules/facilities/application/dto';
import {
  GetOfferQuery,
  GetOfferResponse,
  GetOfferErrors,
} from 'modules/facilities/application/query/getOffer';

@Controller()
export class GetOfferController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetOfferController');

  @Get('facilities/:facilityId/offers/:offerId')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  async getOffer(
    @Param('offerId') offerId: string,
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetOfferResponse = await this.queryBus.execute(
        new GetOfferQuery(offerId, facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetOfferErrors.OfferDoesNotExistError:
          case GetOfferErrors.FacilityNotFoundError:
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

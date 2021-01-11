import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { BaseController } from 'shared/core';

import { OfferDto } from 'modules/facilities/application/dto';
import {
  GetOffersResponse,
  GetOffersQuery,
  GetOffersErrors,
} from 'modules/facilities/application/query/getOffers';

@Controller()
export class GetOffersController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  private logger = new Logger('GetOffersController');

  @Get('facilities/:facilityId/offers')
  @ApiTags('Offers')
  @ApiOkResponse({ type: OfferDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getOffers(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result: GetOffersResponse = await this.queryBus.execute(
        new GetOffersQuery(facilityId),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetOffersErrors.FacilityNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

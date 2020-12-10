import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { OfferQuery } from '../../../infra';
import { OfferDto } from '../../dto';

type GetOffersResponse = Either<AppError.UnexpectedError, Result<OfferDto[]>>;

@Controller()
export class GetOffersController extends BaseController {
  constructor(private readonly offerQuery: OfferQuery) {
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
      const result = await this.handler(facilityId);

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

  private async handler(facilityId: string): Promise<GetOffersResponse> {
    let dto;

    try {
      try {
        dto = await this.offerQuery.getFacilityOffers(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

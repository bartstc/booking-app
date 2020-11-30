import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  AppError,
  BaseController,
  Either,
  left,
  Result,
  right,
} from 'shared/core';

import { GetOfferErrors } from './GetOffer.errors';
import { OfferDto } from '../../dto';
import { OfferQuery } from '../../../infra';

type GetOfferResponse = Either<
  AppError.UnexpectedError | GetOfferErrors.OfferDoesNotExistError,
  Result<OfferDto>
>;

@Controller()
export class GetOfferController extends BaseController {
  constructor(private readonly offerQuery: OfferQuery) {
    super();
  }

  private logger = new Logger('GetOfferController');

  @Get('facilities/:facilityId/offers/:offerId')
  async getOffer(@Param('offerId') offerId: string, @Res() res: Response) {
    try {
      const result = await this.handler(offerId);

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

  private async handler(offerId: string): Promise<GetOfferResponse> {
    let dto;

    try {
      try {
        dto = await this.offerQuery.getOfferById(offerId);
      } catch {
        return left(new GetOfferErrors.OfferDoesNotExistError(offerId));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

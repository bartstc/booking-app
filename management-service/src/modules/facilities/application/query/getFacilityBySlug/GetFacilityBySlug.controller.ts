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

import { FacilityDto } from '../../dto';
import { FacilityQuery } from '../../../infra';
import { GetFacilityBySlugErrors } from './GetFacilityBySlug.errors';

type GetFacilityResponse = Either<
  GetFacilityBySlugErrors.FacilityDoesNotExistError | AppError.UnexpectedError,
  Result<FacilityDto>
>;

@Controller()
export class GetFacilityBySlugController extends BaseController {
  constructor(private readonly facilityQuery: FacilityQuery) {
    super();
  }

  private logger = new Logger('GetFacilityBySlugController');

  @Get('facilities/:slug')
  async getFacility(@Param('slug') slug: string, @Res() res: Response) {
    try {
      const result = await this.handler(slug);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetFacilityBySlugErrors.FacilityDoesNotExistError:
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

  private async handler(slug: string): Promise<GetFacilityResponse> {
    let dto;

    try {
      try {
        dto = await this.facilityQuery.getFacilityBySlug(slug);
      } catch {
        return left(
          new GetFacilityBySlugErrors.FacilityDoesNotExistError(slug),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

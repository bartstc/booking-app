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
import { GetFacilityByIdErrors } from './GetFacilityById.errors';
import { FacilityDto } from '../../dto';
import { FacilityQuery } from '../../../infra';

type GetFacilityResponse = Either<
  GetFacilityByIdErrors.FacilityDoesNotExistError | AppError.UnexpectedError,
  Result<FacilityDto>
>;

@Controller()
export class GetFacilityByIdController extends BaseController {
  constructor(private readonly facilityQuery: FacilityQuery) {
    super();
  }

  private logger = new Logger('GetFacilityByIdController');

  @Get('facilities/:facilityId')
  @ApiTags('Facilities')
  @ApiOkResponse({ type: FacilityDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  async getFacility(
    @Param('facilityId') facilityId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(facilityId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetFacilityByIdErrors.FacilityDoesNotExistError:
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

  private async handler(facilityId: string): Promise<GetFacilityResponse> {
    let dto;

    try {
      try {
        dto = await this.facilityQuery.getFacilityById(facilityId);
      } catch {
        return left(
          new GetFacilityByIdErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

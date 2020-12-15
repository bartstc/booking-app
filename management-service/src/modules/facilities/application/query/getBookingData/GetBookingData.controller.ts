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

import { EmployeeQuery, OfferQuery, FacilityQuery } from '../../../infra';
import { BookingDataDto, EmployeeDto, FacilityDto, OfferDto } from '../../dto';
import { GetBookingDataErrors } from './GetBookingData.errors';

type GetBookingDataResponse = Either<
  | AppError.UnexpectedError
  | GetBookingDataErrors.FacilityNotFoundError
  | GetBookingDataErrors.EmployeeNotFoundError
  | GetBookingDataErrors.OfferNotFoundError,
  Result<BookingDataDto>
>;

@Controller()
export class GetBookingDataController extends BaseController {
  constructor(
    private readonly facilityQuery: FacilityQuery,
    private readonly employeeQuery: EmployeeQuery,
    private readonly offerQuery: OfferQuery,
  ) {
    super();
  }

  private logger = new Logger('GetBookingDataController');

  @Get('facilities/:facilityId/employees/:employeeId/offers/:offerId')
  @ApiTags('Facilities')
  @ApiOkResponse({ type: EmployeeDto })
  @ApiNotFoundResponse({ description: 'Facility not found' })
  @ApiNotFoundResponse({ description: 'Employee not found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  async getEmployee(
    @Param('facilityId') facilityId: string,
    @Param('employeeId') employeeId: string,
    @Param('offerId') offerId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(facilityId, employeeId, offerId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetBookingDataErrors.FacilityNotFoundError:
          case GetBookingDataErrors.EmployeeNotFoundError:
          case GetBookingDataErrors.OfferNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Employee successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(
    facilityId: string,
    employeeId: string,
    offerId: string,
  ): Promise<GetBookingDataResponse> {
    let facilityDto: FacilityDto;
    let employeeDto: EmployeeDto;
    let offerDto: OfferDto;

    try {
      try {
        facilityDto = await this.facilityQuery.getFacilityById(facilityId);
      } catch {
        return left(new GetBookingDataErrors.FacilityNotFoundError(facilityId));
      }

      try {
        employeeDto = await this.employeeQuery.getEmployeeById(employeeId);
      } catch {
        return left(new GetBookingDataErrors.EmployeeNotFoundError(employeeId));
      }

      try {
        offerDto = await this.offerQuery.getOfferById(offerId);
      } catch {
        return left(new GetBookingDataErrors.OfferNotFoundError(offerId));
      }

      return right(
        Result.ok({
          facility: {
            name: facilityDto.name,
          },
          employee: {
            name: employeeDto.name,
          },
          offer: {
            name: offerDto.name,
            variants: offerDto.variants,
          },
        }),
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

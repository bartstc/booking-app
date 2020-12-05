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

import { GetCustomerErrors } from './GetCustomer.errors';
import { CustomerDto } from '../../dto';
import { CustomerQuery } from '../../../infra';

type GetCustomerResponse = Either<
  AppError.UnexpectedError | GetCustomerErrors.CustomerDoesNotExistError,
  Result<CustomerDto>
>;

@Controller()
export class GetCustomerController extends BaseController {
  constructor(private readonly customerQuery: CustomerQuery) {
    super();
  }

  private logger = new Logger('GetCustomerController');

  @Get('facilities/:facilityId/customers/:customerId')
  async getCustomer(
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.handler(customerId);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());
        switch (error.constructor) {
          case GetCustomerErrors.CustomerDoesNotExistError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Customer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }

  private async handler(customerId: string): Promise<GetCustomerResponse> {
    let dto;

    try {
      try {
        dto = await this.customerQuery.getCustomerById(customerId);
      } catch {
        return left(
          new GetCustomerErrors.CustomerDoesNotExistError(customerId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

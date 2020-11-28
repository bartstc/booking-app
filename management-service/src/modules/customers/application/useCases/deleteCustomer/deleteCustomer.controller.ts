import { Response } from 'express';
import { Controller, Delete, Logger, Param, Res } from '@nestjs/common';

import { BaseController } from 'shared/core';

import { CustomerService } from '../../services';
import { DeleteCustomerResponse } from './deleteCustomer.case';
import { DeleteCustomerErrors } from './deleteCustomer.errors';

@Controller()
export class DeleteCustomerController extends BaseController {
  constructor(private readonly service: CustomerService) {
    super();
  }

  logger = new Logger('DeleteCustomerController');

  @Delete('facilities/:facilityId/customers/:customerId')
  async deleteCustomer(
    @Param('customerId') customerId: string,
    @Res() res: Response,
  ) {
    try {
      const result: DeleteCustomerResponse = await this.service.deleteCustomer({
        customerId,
      });

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case DeleteCustomerErrors.CustomerNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Customer successfully deleted');
      return this.ok(res);
    } catch (err) {
      this.logger.error('Unexpected server error', err);
      return this.fail(res, err);
    }
  }
}

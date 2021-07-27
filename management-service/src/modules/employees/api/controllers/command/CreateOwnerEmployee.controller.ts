import { CommandBus } from '@nestjs/cqrs';
import { Body, Controller, Inject, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController, ValidationTransformer } from 'shared/core';

import {
  CreateOwnerEmployeeCommand,
  CreateOwnerEmployeeDto,
  CreateOwnerEmployeeErrors,
  CreateOwnerEmployeeResponse,
} from '../../../application/command/createOwnerEmployee';

import { createOwnerEmployeeSchema } from '../../schemas';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class CreateOwnerEmployeeController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.EmployeesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Post('enterprises/:enterpriseId/employees/owner')
  @ApiTags('Employees')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Enterprise not found' })
  async addEmployee(
    @Param('enterpriseId') enterpriseId: string,
    @Body() dto: CreateOwnerEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      const formErrors = await ValidationTransformer.validateSchema(
        dto,
        createOwnerEmployeeSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: CreateOwnerEmployeeResponse = await this.commandBus.execute(
        new CreateOwnerEmployeeCommand(enterpriseId, dto),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case CreateOwnerEmployeeErrors.EnterpriseNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Employee successfully added');
      return this.ok(res, {
        employeeId: result.value.getValue().id.toString(),
      });
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}

import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { Body, Controller, Inject, Param, Put, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { BaseController } from 'shared/core';

import {
  ChangeActiveFacilityResponse,
  ChangeActiveFacilityErrors,
  ChangeActiveFacilityCommand,
  ChangeActiveFacilityDto,
} from '../../../application/command/changeActiveFacility';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { ILoggerService } from '../../../../../logger';

@Controller()
export class ChangeActiveFacilityController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    @Inject(InfrastructureKeys.EmployeesLoggerService)
    private readonly logger: ILoggerService,
  ) {
    super();
  }

  @Put('enterprises/:enterpriseId/employees/:employeeId/changeActiveFacility')
  @ApiTags('Employees')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Employee not found' })
  async activateEmployee(
    @Param('employeeId') employeeId: string,
    @Body() dto: ChangeActiveFacilityDto,
    @Res() res: Response,
  ) {
    try {
      const result: ChangeActiveFacilityResponse = await this.commandBus.execute(
        new ChangeActiveFacilityCommand(employeeId, dto),
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case ChangeActiveFacilityErrors.EmployeeNotFoundError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.log('Active facility was successfully changed');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}

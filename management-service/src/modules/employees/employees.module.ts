import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EnterpriseModule } from '../enterprise/enterprise.module';
import { DatabaseModule } from '../../database';
import { AmqpModule } from '../../amqp';
import { AuthModule } from '../../auth';
import { providers } from './employee.providers';

import { AddEmployeeHandler } from './application/command/addEmployee';
import { RemoveEmployeeHandler } from './application/command/removeEmployee';
import { ActivateEmployeeHandler } from './application/command/activateEmployee';
import { DeactivateEmployeeHandler } from './application/command/deactivateEmployee';
import { CreateOwnerEmployeeHandler } from './application/command/createOwnerEmployee';

import { GetEmployeeHandler } from './application/query/getEmployee';
import { GetEmployeeByEmailHandler } from './application/query/getEmployeeByEmail';
import { GetEmployeesHandler } from './application/query/getEmployees';

import {
  ActivateEmployeeController,
  AddEmployeeController,
  DeactivateEmployeeController,
  RemoveEmployeeController,
  CreateOwnerEmployeeController,
} from './api/controllers/command';

import {
  GetEmployeeByEmailController,
  GetEmployeeController,
  GetEmployeesController,
} from './api/controllers/query';

@Module({
  imports: [
    CqrsModule,
    EnterpriseModule,
    DatabaseModule,
    AmqpModule,
    AuthModule,
  ],
  controllers: [
    AddEmployeeController,
    RemoveEmployeeController,
    ActivateEmployeeController,
    DeactivateEmployeeController,
    GetEmployeesController,
    GetEmployeeController,
    GetEmployeeByEmailController,
    CreateOwnerEmployeeController,
  ],
  providers: [
    AddEmployeeHandler,
    RemoveEmployeeHandler,
    ActivateEmployeeHandler,
    DeactivateEmployeeHandler,
    GetEmployeeByEmailHandler,
    GetEmployeesHandler,
    GetEmployeeHandler,
    GetEmployeeByEmailHandler,
    CreateOwnerEmployeeHandler,
    ...providers,
  ],
  exports: [providers[0]],
})
export class EmployeesModule {}

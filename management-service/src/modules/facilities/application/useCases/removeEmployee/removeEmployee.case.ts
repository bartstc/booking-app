import { InjectRepository } from '@nestjs/typeorm';
import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { FacilityRepository, EmployeeRepository } from '../../../adapter';
import { RemoveEmployeeErrors } from './removeEmployee.errors';
import { RemoveEmployeeDto } from './removeEmployee.dto';

export type RemoveEmployeeResponse = Either<
  | AppError.UnexpectedError
  | RemoveEmployeeErrors.FacilityNotFoundError
  | RemoveEmployeeErrors.EmployeeNotFoundError,
  Result<void>
>;

export class RemoveEmployeeCase
  implements UseCase<RemoveEmployeeDto, Promise<RemoveEmployeeResponse>> {
  constructor(
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    @InjectRepository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    facilityId,
    employeeId,
  }: RemoveEmployeeDto): Promise<RemoveEmployeeResponse> {
    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new RemoveEmployeeErrors.FacilityNotFoundError());
      }

      const employeeExists = await this.employeeRepository.exists(employeeId);
      if (!employeeExists) {
        return left(new RemoveEmployeeErrors.EmployeeNotFoundError());
      }

      const offer = await this.employeeRepository.getEmployeeById(employeeId);
      const facility = await this.facilityRepository.getFacilityById(
        facilityId,
      );
      facility.removeEmployee(offer);

      await this.employeeRepository.deleteEmployee(employeeId);
      await this.facilityRepository.persistModel(facility);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}

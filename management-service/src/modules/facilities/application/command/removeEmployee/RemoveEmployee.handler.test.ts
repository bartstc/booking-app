import { Test } from '@nestjs/testing';

import { FacilityKeys } from '../../../FacilityKeys';
import {
  createFacility,
  createEmployee,
  FacilityRepositoryMock,
  EmployeeRepositoryMock,
} from '../../../../../../fixtures/facilities';
import { DB_CONNECTION } from '../../../../../constants';
import { ConnectionMock } from '../../../../../../fixtures';
import { UniqueEntityID } from '../../../../../shared/domain';
import { CannotRemoveActiveEmployeeGuard } from '../../guards';
import { RemoveEmployeeHandler } from './RemoveEmployee.handler';
import { RemoveEmployeeCommand } from './RemoveEmployee.command';
import { RemoveEmployeeErrors } from './RemoveEmployee.errors';

describe('RemoveEmployeeHandler', () => {
  let removeEmployeeHandler: RemoveEmployeeHandler;
  let employeeRepository;
  let facilityRepository;

  const enterpriseId = new UniqueEntityID('123');
  const facilityId = new UniqueEntityID('456');
  const employeeId = new UniqueEntityID('789');

  const facility = createFacility({ facilityId, enterpriseId });
  const employee = createEmployee({ facilityId, employeeId });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        RemoveEmployeeHandler,
        {
          provide: DB_CONNECTION,
          useFactory: ConnectionMock,
        },
        {
          provide: FacilityKeys.EmployeeRepository,
          useFactory: EmployeeRepositoryMock,
        },
        {
          provide: FacilityKeys.FacilityRepository,
          useFactory: FacilityRepositoryMock,
        },
      ],
    }).compile();

    facility.addEmployee(employee);
    removeEmployeeHandler = await module.get(RemoveEmployeeHandler);
    employeeRepository = await module.get(FacilityKeys.EmployeeRepository);
    facilityRepository = await module.get(FacilityKeys.FacilityRepository);
  });

  it(`should return "FacilityNotFoundError" error`, async function () {
    facilityRepository.getFacilityById.mockRejectedValue(null);

    const result = await removeEmployeeHandler.execute(
      new RemoveEmployeeCommand(facilityId.toString(), employeeId.toString()),
    );

    expect(result.value.constructor).toBe(
      RemoveEmployeeErrors.FacilityNotFoundError,
    );
  });

  it(`should return "EmployeeNotFoundError" error`, async function () {
    facilityRepository.getFacilityById.mockResolvedValue(facility);
    employeeRepository.getEmployeeById.mockRejectedValue(null);

    const result = await removeEmployeeHandler.execute(
      new RemoveEmployeeCommand(facilityId.toString(), employeeId.toString()),
    );

    expect(result.value.constructor).toBe(
      RemoveEmployeeErrors.EmployeeNotFoundError,
    );
  });

  it(`should return "CannotRemoveActiveEmployeeGuard" error`, async function () {
    facilityRepository.getFacilityById.mockResolvedValue(facility);
    employeeRepository.getEmployeeById.mockResolvedValue(employee);

    const result = await removeEmployeeHandler.execute(
      new RemoveEmployeeCommand(facilityId.toString(), employeeId.toString()),
    );

    expect(result.value.constructor).toBe(CannotRemoveActiveEmployeeGuard);
  });

  it(`should successfully remove employee`, async function () {
    facilityRepository.getFacilityById.mockResolvedValue(facility);
    employeeRepository.getEmployeeById.mockResolvedValue(employee);

    employee.deactivate();

    const result = await removeEmployeeHandler.execute(
      new RemoveEmployeeCommand(facilityId.toString(), employeeId.toString()),
    );

    expect(result.value.isSuccess).toBeTruthy();
  });
});

import { EmployeeCollectionQueryParams } from '../../../adapter/params';

export class GetEmployeesQuery {
  constructor(
    public readonly facilityId: string,
    public readonly params: EmployeeCollectionQueryParams,
  ) {}
}

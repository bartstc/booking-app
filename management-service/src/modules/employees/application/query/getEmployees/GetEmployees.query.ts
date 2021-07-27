import { EmployeeCollectionQueryParams } from '../../../adapter/params';

export class GetEmployeesQuery {
  constructor(
    public readonly enterpriseId: string,
    public readonly params: EmployeeCollectionQueryParams,
  ) {}
}

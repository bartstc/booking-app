export class GetEmployeeByEmailQuery {
  constructor(
    public readonly employeeEmail: string,
    public readonly facilityId: string,
  ) {}
}

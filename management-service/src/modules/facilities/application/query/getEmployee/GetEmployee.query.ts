export class GetEmployeeQuery {
  constructor(
    public readonly employeeId: string,
    public readonly facilityId: string,
  ) {}
}

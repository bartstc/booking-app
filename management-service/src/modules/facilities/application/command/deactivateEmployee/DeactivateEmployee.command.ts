export class DeactivateEmployeeCommand {
  constructor(
    public readonly facilityId: string,
    public readonly employeeId: string,
  ) {}
}

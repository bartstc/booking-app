export class ActivateEmployeeCommand {
  constructor(
    public readonly facilityId: string,
    public readonly employeeId: string,
  ) {}
}

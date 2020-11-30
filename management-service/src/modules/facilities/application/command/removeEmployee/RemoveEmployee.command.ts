export class RemoveEmployeeCommand {
  constructor(
    public readonly facilityId: string,
    public readonly employeeId: string,
  ) {}
}

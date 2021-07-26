export class DeactivateEmployeeCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly employeeId: string,
  ) {}
}

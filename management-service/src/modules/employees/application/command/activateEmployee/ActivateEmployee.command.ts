export class ActivateEmployeeCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly employeeId: string,
  ) {}
}

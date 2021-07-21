export class RemoveEmployeeCommand {
  constructor(
    public readonly enterpriseId: string,
    public readonly employeeId: string,
  ) {}
}

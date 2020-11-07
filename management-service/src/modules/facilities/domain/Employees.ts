import { WatchedList } from 'shared/domain';

import { Employee } from './Employee';

export class Employees extends WatchedList<Employee> {
  private constructor(initialEmployees: Employee[]) {
    super(initialEmployees);
  }

  public compareItems(a: Employee, b: Employee): boolean {
    return a.equals(b);
  }

  public static create(initialEmployees?: Employee[]): Employees {
    return new Employees(initialEmployees ?? []);
  }
}

export interface IAddAvailableEmployeeDto {
  employeeId: string;
  startTime: string;
  endTime: string;
  creatorId: string;
}

export interface ICollection {
  startDate: string;
  endDate: string;
  availabilities: IAddAvailableEmployeeDto[];
}

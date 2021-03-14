export interface IBookingTerm {
  date: string;
  availableEmployeeIds: Array<string>;
  unavailableEmployees: Array<IUnavailableEmployee>;
}

interface IUnavailableEmployee {
  employeeId: string;
  earlierAvailabilityDate: string;
  laterAvailableDate: string;
}

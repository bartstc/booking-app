import { IAddAvailabilityDto } from './IAddAvailabilityDto';

export interface IAddAvailabilitiesDto {
  dateFrom: string;
  dateTo: string;
  employeeId: string;
  creatorId: string;
  availabilities: IAddAvailabilityDto[];
}

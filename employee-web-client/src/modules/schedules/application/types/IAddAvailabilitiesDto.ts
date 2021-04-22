import { IAddAvailabilityDto } from './IAddAvailabilityDto';

export interface IAddAvailabilitiesDto {
  dateFrom: string;
  dateTo: string;
  availabilities: IAddAvailabilityDto[];
}

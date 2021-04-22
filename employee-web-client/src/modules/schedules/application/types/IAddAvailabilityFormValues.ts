import { IAddAvailabilityDto } from './IAddAvailabilityDto';

export interface IAddAvailabilityFormValues extends Pick<IAddAvailabilityDto, 'startTime' | 'endTime'> {}

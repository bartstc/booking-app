import { ContextType } from 'types';

export interface IEmployeeScope {
  employeeId: string;
  enterpriseId: string;
  contextType: ContextType.Employee;
  facilityIds: string[];
  activeFacilityId: string;
}

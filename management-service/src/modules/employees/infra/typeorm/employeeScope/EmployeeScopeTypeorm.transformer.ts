import { EmployeeScopeEntity } from './EmployeeScope.entity';
import { EmployeeScopeDto } from '../../../application/dto';

export class EmployeeScopeTypeormTransformer {
  public static toDto(employeeScope: EmployeeScopeEntity): EmployeeScopeDto {
    return {
      employeeScopeId: employeeScope.employee_scope_id,
      employeeId: employeeScope.employee_id,
      enterpriseId: employeeScope.enterprise_id,
      contextType: employeeScope.context_type,
      facilityIds: employeeScope.facility_ids,
      activeFacilityId: employeeScope.active_facility_id,
    };
  }
}

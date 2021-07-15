import { UniqueEntityID } from '../../src/shared/domain';
import {
  BuildEmployeeDto,
  EmployeeMap,
} from '../../src/modules/facilities/adapter';
import { ContactType } from '../../src/shared/domain/types';
import { Employee } from '../../src/modules/facilities/domain';

interface Props {
  employeeId?: UniqueEntityID;
  facilityId?: UniqueEntityID;
  dto?: Partial<BuildEmployeeDto>;
}

const defaultDto: BuildEmployeeDto = {
  employeeName: 'Jane Doe',
  employeeEmail: 'janedoe@gmail.com',
  position: 'Hairdresser',
  birthDate: new Date(),
  employmentDate: new Date(),
  contacts: [
    {
      type: ContactType.Url,
      value: 'www.johndoe.com',
    },
  ],
};

export const createEmployee = ({
  dto = {},
  facilityId = new UniqueEntityID(),
  employeeId = new UniqueEntityID(),
}: Props): Employee => {
  return EmployeeMap.dtoToDomain(
    { ...defaultDto, ...dto },
    facilityId.toString(),
    employeeId.toString(),
  ).getValue();
};

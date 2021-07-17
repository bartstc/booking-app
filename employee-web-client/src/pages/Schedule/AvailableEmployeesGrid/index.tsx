import React from 'react';
import { useParams } from 'react-router-dom';
import { SimpleGrid } from '@chakra-ui/react';
import { Dayjs } from 'dayjs';

import { dayjs } from 'utils/dayjs';
import { FetchBoundary } from 'shared/Suspense';

import { availabilitiesQuery, availabilitiesQueryKey } from 'modules/schedules/infrastructure/query';
import { useRangeWeekDatesConsumer } from 'modules/schedules/presentation';
import { useEmployeesQuery } from 'modules/employees/infrastructure/query';
import { useFacilityContextSelector } from 'modules/context';
import { useFreeWeekDays } from 'modules/schedules/application';

import { FilledAvailabilityPopover } from './FilledAvailabilityPopover';
import { EmptyAvailabilityPopover } from './EmptyAvailabilityPopover';
import { AvailabilityCell } from './AvailabilityCell';
import { EmployeeCell } from './EmployeeCell';

interface IProps {
  weekDates: Dayjs[];
  isInRange: (date: Dayjs) => boolean;
}

const AvailableEmployeesGrid = ({ weekDates, isInRange }: IProps) => {
  const params = useParams<{ scheduleId: string }>();

  const facilityId = useFacilityContextSelector(state => state.facilityId);
  const workingDays = useFacilityContextSelector(state => state.workingDays);

  const { endTime, startTime } = useRangeWeekDatesConsumer();
  const freeWeekDaysIndexes = useFreeWeekDays(workingDays);

  const { collection: employees } = useEmployeesQuery(facilityId);

  return (
    <FetchBoundary
      queryKey={availabilitiesQueryKey(facilityId, params.scheduleId, { endTime, startTime })}
      queryFn={() => availabilitiesQuery(facilityId, params.scheduleId, { endTime, startTime })}
    >
      {({ data: { collection: availabilities } }) => (
        <>
          {employees.map(employee => {
            const employeeAvailabilities = availabilities.filter(availability => availability.employeeId === employee.employeeId);

            return (
              <SimpleGrid key={employee.employeeId} w='100%' spacingX={0} columns={8}>
                <EmployeeCell employee={employee} />
                {weekDates.map((weekDate, index) => {
                  const availabilities = employeeAvailabilities.filter(
                    employee => dayjs(employee.startTime).format('D-M') === weekDate.format('D-M'),
                  );

                  const isOutOfSchedule = !isInRange(weekDate);
                  const isFreeWeekDay = freeWeekDaysIndexes.includes(weekDate.weekday());

                  if (isOutOfSchedule || isFreeWeekDay) {
                    return <AvailabilityCell key={index} isBlocked />;
                  }

                  if (availabilities.length === 0) {
                    return (
                      <AvailabilityCell key={index}>
                        <EmptyAvailabilityPopover
                          dayDate={weekDate}
                          employeeId={employee.employeeId}
                          index={0}
                          scheduleId={params.scheduleId}
                        />
                      </AvailabilityCell>
                    );
                  }

                  return (
                    <AvailabilityCell key={index}>
                      {availabilities.map((availability, index) => (
                        <FilledAvailabilityPopover
                          key={index}
                          index={index}
                          scheduleId={params.scheduleId}
                          employeeId={employee.employeeId}
                          dayDate={weekDate}
                          availabilities={availabilities}
                        />
                      ))}
                    </AvailabilityCell>
                  );
                })}
              </SimpleGrid>
            );
          })}
        </>
      )}
    </FetchBoundary>
  );
};

export { AvailableEmployeesGrid };

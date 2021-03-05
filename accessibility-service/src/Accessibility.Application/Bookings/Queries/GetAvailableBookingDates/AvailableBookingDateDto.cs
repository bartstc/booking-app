using System;
using System.Collections.Generic;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingDates
{
    public class AvailableBookingDateDto
    {
        public AvailableBookingDateDto(DateTime date, IEnumerable<Guid> availableEmployeeIds, IEnumerable<UnavailableEmployee> unavailableEmployees)
        {
            Date = date;
            AvailableEmployeeIds = availableEmployeeIds;
            UnavailableEmployees = unavailableEmployees;
        }

        public DateTime Date { get; }
        public IEnumerable<Guid> AvailableEmployeeIds { get; }
        public IEnumerable<UnavailableEmployee> UnavailableEmployees { get; }

    }

    public class UnavailableEmployee
    {
        public UnavailableEmployee(Guid employeeId)
        {
            EmployeeId = employeeId;
        }

        public UnavailableEmployee(Guid employeeId, DateTime earlierAvailabilityDate, DateTime laterAvailableDate)
        {
            EmployeeId = employeeId;
            EarlierAvailabilityDate = earlierAvailabilityDate;
            LaterAvailableDate = laterAvailableDate;
        }

        public Guid EmployeeId { get; }
        public DateTime EarlierAvailabilityDate { get; set; }
        public DateTime LaterAvailableDate { get; set; }
    }
}

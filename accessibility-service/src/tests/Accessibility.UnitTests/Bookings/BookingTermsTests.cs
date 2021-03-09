using System;
using System.Collections.Generic;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms;
using Accessibility.Application.Schedules;
using Xunit;
using Moq;
using Accessibility.Application.Bookings.Queries;
using Accessibility.Application.Bookings;
using System.Threading.Tasks;
using System.Linq;

namespace Accessibility.UnitTests.Bookings
{
    public class BookingTermsTests
    {
        [Theory]
        [MemberData(nameof(AvailabilitiesBookingsExpected))]
        public async Task GetAvailableBookingDatesHandle_SchedulesAndBookingsExist_ReturnsCorrectTerms(
            DateTime dateFrom,
            DateTime dateTo,
            List<EmployeeAvailability> availabilities,
            List<BookedTerm> bookedTerms,
            List<AvailableBookingTermDto> expected)
        {
            var scheduleRepoMock = new Mock<IScheduleQueryRepository>();
            var bookingRepoMock = new Mock<IBookingQueryRepository>();
            scheduleRepoMock.Setup(s => s.GetAllAvailabilities(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Guid>())).ReturnsAsync(availabilities);
            bookingRepoMock.Setup(b => b.GetBookedTerms(It.IsAny<Guid>(), It.IsAny<DateTime>(), It.IsAny<DateTime>())).ReturnsAsync(bookedTerms);

            var result = await new GetAvailableBookingTermsQueryHandler(scheduleRepoMock.Object, bookingRepoMock.Object)
                .Handle(new GetAvailableBookingTermsQuery(
                        Guid.NewGuid(),
                        Guid.NewGuid(),
                        dateFrom,
                        dateTo,
                        new BookingRulesData(2, false, 10)),
                    new System.Threading.CancellationToken());
            
            Assert.Equal(expected.Count, result.Count());
            for (int i = 0; i < expected.Count; i++)
            {
                var expectedAvailability = expected[i];
                var resultAvailability = result.ElementAt(i);
                Assert.Equal(expectedAvailability.Date, resultAvailability.Date);
                Assert.Equal(expectedAvailability.AvailableEmployeeIds.Count(), resultAvailability.AvailableEmployeeIds.Count());
                foreach (var expectedEmployeeId in expectedAvailability.AvailableEmployeeIds)
                {
                    Assert.Contains(expectedEmployeeId, resultAvailability.AvailableEmployeeIds);
                }
                Assert.Equal(expectedAvailability.UnavailableEmployees.Count(), resultAvailability.UnavailableEmployees.Count());
                foreach (var expectedUnavailability in expectedAvailability.UnavailableEmployees)
                {
                    Assert.Contains(expectedUnavailability.EmployeeId, resultAvailability.UnavailableEmployees.Select(u => u.EmployeeId));
                }
            }
        }

        public static IEnumerable<object[]> AvailabilitiesBookingsExpected = new List<object[]>
        {
            new object[] // two employees working together, no bookings
            {
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new EmployeeAvailability {
                        EmployeeId = Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2"),
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<BookedTerm> {
                },
                new List<AvailableBookingTermDto> {
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    )
                }
            },
            new object[] // two employees working together, one has one booking
            {
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new EmployeeAvailability {
                        EmployeeId = Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2"),
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<BookedTerm> {
                    new BookedTerm {
                        EmployeeId = Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                        DateFrom = DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        DateTo = DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<AvailableBookingTermDto> {
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"))
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            Guid.Parse("98019811-49de-4989-8b6e-5915d956e866"),
                            Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2")
                        },
                        new List<UnavailableEmployee>()
                    )
                }
            }
        };
    }
}

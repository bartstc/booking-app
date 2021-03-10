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
using Accessibility.Application.Facilities;

namespace Accessibility.UnitTests.Bookings
{
    public class BookingTermsTests
    {
        private readonly static Guid employee1 = Guid.Parse("98019811-49de-4989-8b6e-5915d956e866");
        private readonly static Guid employee2 = Guid.Parse("e2f9cc1a-151a-429a-b162-9365e207b3d2");
        private readonly static Guid employee3 = Guid.Parse("dc677cf1-d1a0-44d2-a845-8ed6e3b69182");


        [Theory]
        [MemberData(nameof(AvailabilitiesBookingsExpected))]
        public async Task GetAvailableBookingDatesHandle_SchedulesAndBookingsExist_ReturnsCorrectTerms(
            int offerDuration,
            DateTime dateFrom,
            DateTime dateTo,
            BookingRulesData bookingRulesData,
            List<EmployeeAvailability> availabilities,
            List<BookedTerm> bookedTerms,
            List<AvailableBookingTermDto> expected)
        {
            var scheduleRepoMock = new Mock<IScheduleQueryRepository>();
            var bookingRepoMock = new Mock<IBookingQueryRepository>();
            var offerRepoMock = new Mock<IOfferQueryRepository>();
            scheduleRepoMock.Setup(s => s.GetAllAvailabilities(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<Guid>())).ReturnsAsync(availabilities);
            bookingRepoMock.Setup(b => b.GetBookedTerms(It.IsAny<Guid>(), It.IsAny<DateTime>(), It.IsAny<DateTime>())).ReturnsAsync(bookedTerms);
            offerRepoMock.Setup(o => o.GetOfferDuration(It.IsAny<Guid>(), It.IsAny<Guid>())).ReturnsAsync((short)offerDuration);

            var result = await new GetAvailableBookingTermsQueryHandler(scheduleRepoMock.Object, bookingRepoMock.Object, offerRepoMock.Object)
                .Handle(new GetAvailableBookingTermsQuery(
                        Guid.NewGuid(),
                        Guid.NewGuid(),
                        dateFrom,
                        dateTo,
                        bookingRulesData),
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
                30,
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new BookingRulesData(2, false, 0),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = employee1,
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new EmployeeAvailability {
                        EmployeeId = employee2,
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
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    )
                }
            },
            new object[] // two employees working together, one has one booking
            {
                30,
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new BookingRulesData(2, false, 0),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = employee1,
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new EmployeeAvailability {
                        EmployeeId = employee2,
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<BookedTerm> {
                    new BookedTerm {
                        EmployeeId = employee1,
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
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1,
                            employee2
                        },
                        new List<UnavailableEmployee>()
                    )
                }
            },
            new object[] // two employees not working together, one has one long booking
            {
                30,
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new BookingRulesData(2, false, 0),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = employee1,
                        StartTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 12:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new EmployeeAvailability {
                        EmployeeId = employee2,
                        StartTime = DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<BookedTerm> {
                    new BookedTerm {
                        EmployeeId = employee1,
                        DateFrom = DateTime.ParseExact("2022-05-08 10:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        DateTo = DateTime.ParseExact("2022-05-08 11:15:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<AvailableBookingTermDto> {
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 08:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 09:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee2)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 11:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee2)
                        }
                    )
                }
            },
            new object[] // two employees working together in a period of time, both have bookings
            {
                30,
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new BookingRulesData(2, false, 0),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = employee1,
                        StartTime = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 12:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new EmployeeAvailability {
                        EmployeeId = employee2,
                        StartTime = DateTime.ParseExact("2022-05-08 11:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        EndTime = DateTime.ParseExact("2022-05-08 13:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<BookedTerm> {
                    new BookedTerm {
                        EmployeeId = employee1,
                        DateFrom = DateTime.ParseExact("2022-05-08 10:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        DateTo = DateTime.ParseExact("2022-05-08 10:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new BookedTerm {
                        EmployeeId = employee1,
                        DateFrom = DateTime.ParseExact("2022-05-08 11:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        DateTo = DateTime.ParseExact("2022-05-08 11:45:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    },
                    new BookedTerm {
                        EmployeeId = employee2,
                        DateFrom = DateTime.ParseExact("2022-05-08 11:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        DateTo = DateTime.ParseExact("2022-05-08 11:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture)
                    }
                },
                new List<AvailableBookingTermDto> {
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 10:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee1
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee2)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 11:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 12:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    ),
                    new AvailableBookingTermDto(
                        DateTime.ParseExact("2022-05-08 12:30:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1)
                        }
                    )
                }
            },
            new object[] // three employees, booking possible every 15 mins
            {
                30,
                DateTime.ParseExact("2022-05-08 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                DateTime.ParseExact("2022-05-09 08:00:00,000", "yyyy-MM-dd HH:mm:ss,fff",
                                       System.Globalization.CultureInfo.InvariantCulture),
                new BookingRulesData(4, false, 0),
                new List<EmployeeAvailability> {
                    new EmployeeAvailability {
                        EmployeeId = employee1,
                        StartTime = new DateTime(2022, 5, 8, 10, 0, 0),
                        EndTime = new DateTime(2022, 5, 8, 13, 0, 0)
                    },
                    new EmployeeAvailability {
                        EmployeeId = employee2,
                        StartTime = new DateTime(2022, 5, 8, 12, 0, 0),
                        EndTime = new DateTime(2022, 5, 8, 15, 0, 0)
                    },
                    new EmployeeAvailability {
                        EmployeeId = employee3,
                        StartTime = new DateTime(2022, 5, 8, 8, 0, 0),
                        EndTime = new DateTime(2022, 5, 8, 16, 0, 0)
                    }
                },
                new List<BookedTerm> {
                    new BookedTerm {
                        EmployeeId = employee1,
                        DateFrom = new DateTime(2022, 5, 8, 10, 30, 0),
                        DateTo = new DateTime(2022, 5, 8, 12, 30, 0)
                    },
                    new BookedTerm {
                        EmployeeId = employee2,
                        DateFrom = new DateTime(2022, 5, 8, 12, 0, 0),
                        DateTo = new DateTime(2022, 5, 8, 13, 0, 0)
                    },
                    new BookedTerm {
                        EmployeeId = employee2,
                        DateFrom = new DateTime(2022, 5, 8, 13, 30, 0),
                        DateTo = new DateTime(2022, 5, 8, 14, 15, 0)
                    },
                    new BookedTerm {
                        EmployeeId = employee2,
                        DateFrom = new DateTime(2022, 5, 8, 14, 30, 0),
                        DateTo = new DateTime(2022, 5, 8, 15, 0, 0)
                    },
                    new BookedTerm {
                        EmployeeId = employee3,
                        DateFrom = new DateTime(2022, 5, 8, 8, 0, 0),
                        DateTo = new DateTime(2022, 5, 8, 12, 0, 0)
                    },
                    new BookedTerm {
                        EmployeeId = employee3,
                        DateFrom = new DateTime(2022, 5, 8, 12, 15, 0),
                        DateTo = new DateTime(2022, 5, 8, 15, 0, 0)
                    },
                    new BookedTerm {
                        EmployeeId = employee3,
                        DateFrom = new DateTime(2022, 5, 8, 15, 30, 0),
                        DateTo = new DateTime(2022, 5, 8, 16, 0, 0)
                    }
                },
                new List<AvailableBookingTermDto> {
                    new AvailableBookingTermDto(
                        new DateTime(2022, 5, 8, 10, 0, 0),
                        new List<Guid> {
                            employee1
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee2),
                            new UnavailableEmployee(employee3)
                        }
                    ),
                    new AvailableBookingTermDto(
                        new DateTime(2022, 5, 8, 12, 30, 0),
                        new List<Guid> {
                            employee1
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee2),
                            new UnavailableEmployee(employee3)
                        }
                    ),
                    new AvailableBookingTermDto(
                        new DateTime(2022, 5, 8, 13, 0, 0),
                        new List<Guid> {
                            employee2
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1),
                            new UnavailableEmployee(employee3)
                        }
                    ),
                    new AvailableBookingTermDto(
                        new DateTime(2022, 5, 8, 15, 0, 0),
                        new List<Guid> {
                            employee3
                        },
                        new List<UnavailableEmployee> {
                            new UnavailableEmployee(employee1),
                            new UnavailableEmployee(employee2)
                        }
                    )
                }
            }
        };
    }
}

using AutoMapper;
using Community.Application.Members.Commands.AddFulfilledBooking;
using ExternalEvents.Accessibility.BookingRecords;

namespace Community.Infrastructure.IntegrationEvents.Members.Mappings
{
    public class EventToCommandMappingProfile : Profile
    {
        public EventToCommandMappingProfile()
        {
            CreateMap<BookingRecordFulfilled, AddFulfilledBookingCommand>()
                .ForMember(dest => dest.MemberId, opt => opt.MapFrom(src => src.CustomerId));
        }
    }
}

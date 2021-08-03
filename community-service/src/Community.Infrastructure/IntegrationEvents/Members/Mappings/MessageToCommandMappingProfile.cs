using AutoMapper;
using Community.Application.Members.Commands.AddCompletedBookings;
using ExternalEvents.Accessibility.Bookings;

namespace Community.Infrastructure.IntegrationEvents.Members.Mappings
{
    public class MessageToCommandMappingProfile : Profile
    {
        public MessageToCommandMappingProfile()
        {
            CreateMap<BookingCompleted, AddCompletedBookingsCommand>()
                .ForMember(dest => dest.MemberId, opt => opt.MapFrom(src => src.PublicCustomerId))
                .ForMember(dest => dest.Bookings, opt => opt.MapFrom(src => src.BookedRecords));
            CreateMap<BookedRecord, BookingData>();
        }
    }
}

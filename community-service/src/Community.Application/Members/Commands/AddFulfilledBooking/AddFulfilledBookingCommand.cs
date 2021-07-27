using System;
using Community.Domain.Members.ValueObjects;
using Core.Commands;

namespace Community.Application.Members.Commands.AddFulfilledBooking
{
    public record AddFulfilledBookingCommand(
        Guid MemberId,
        BookingOffer Offer,
        BookingFacility Facility,
        BookingEmployee Employee,
        DateTime Date,
        short Duration,
        Guid BookedRecordId
    ) : ICommand;
}

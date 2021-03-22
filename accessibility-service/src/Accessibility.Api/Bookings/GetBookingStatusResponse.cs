namespace Accessibility.Api.Bookings
{
    public class GetBookingStatusResponse
    {
        public GetBookingStatusResponse(string status)
        {
            Status = status;
        }

        public string Status { get; }
    }
}

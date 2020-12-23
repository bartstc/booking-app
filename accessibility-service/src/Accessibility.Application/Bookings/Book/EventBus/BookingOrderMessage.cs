namespace Accessibility.Application.Bookings.Book.EventBus
{
    public class BookingOrderMessage
    {
        public BookingOrderMessage()
        {
            Test = "Booking test";
        }
        public string Test { get; set; }
    }
}

namespace Accessibility.Application.Bookings
{
    public class BookingRulesData
    {
        public BookingRulesData(short hourChunkCount, bool useBreakBetweenBookingsMechanism, short breakBetweenBookings)
        {
            HourChunkCount = hourChunkCount;
            UseBreakBetweenBookingsMechanism = useBreakBetweenBookingsMechanism;
            BreakBetweenBookings = breakBetweenBookings;
        }

        public short HourChunkCount { get; }
        public bool UseBreakBetweenBookingsMechanism { get; }
        public short BreakBetweenBookings { get; }
    }
}

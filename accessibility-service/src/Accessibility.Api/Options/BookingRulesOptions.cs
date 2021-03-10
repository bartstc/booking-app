namespace Accessibility.Api.Options
{
    public class BookingRulesOptions
    {
        public const string BookingRules = "BookingRules";

        public short HourChunkCount { get; set; }
        public bool UseBreakBetweenBookingsMechanism { get; set; }
        public short BreakBetweenBookings { get; set; }
    }
}

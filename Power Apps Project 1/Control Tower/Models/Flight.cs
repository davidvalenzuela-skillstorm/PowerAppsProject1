namespace Control_Tower.Models
{
    public class Flight
    {
        public int ID { get; set; }
        public int FlightNumber { get; set; }
        public DateOnly DepartureDate { get; set; }
        public TimeOnly DepartureTime { get; set; }
        public DateOnly ArrivalDate { get; set; }
        public TimeOnly ArrivalTime { get; set; }
        public string DepartureAirport { get; set; } = String.Empty;
        public string ArrivalAirport { get; set; } = String.Empty;
        public int PassengerLimit { get; set; }
    }
}

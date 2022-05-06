namespace Control_Tower.Models
{
    public class Flight
    {
        public int ID { get; set; }
        public DateTime DepartureDateTime { get; set; }
        public DateTime ArrivalDateTime { get; set; }
        public string DepartureAirport { get; set; } = String.Empty;
        public string ArrivalAirport { get; set; } = String.Empty;
        public int PassengerLimit { get; set; }
    }
}

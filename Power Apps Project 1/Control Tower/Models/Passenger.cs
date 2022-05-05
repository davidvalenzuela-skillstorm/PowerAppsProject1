namespace Control_Tower.Models
{
    public class Passenger
    {
        public int ID { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Job { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public int Age { get; set; }
        public int FlightID { get; set; }

        public ICollection<Flight> Flight { get; set; } = null!;
    }
}

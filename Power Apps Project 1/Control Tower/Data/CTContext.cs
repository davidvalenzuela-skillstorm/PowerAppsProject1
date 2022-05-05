using Control_Tower.Models;
using Microsoft.EntityFrameworkCore;

namespace Control_Tower.Data
{
    public class CTContext : DbContext
    {
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Passenger> Passengers { get; set; }

        public CTContext(DbContextOptions<CTContext> options) : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //}
    }
}

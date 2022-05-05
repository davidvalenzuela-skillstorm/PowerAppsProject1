using Control_Tower.Models;
using Microsoft.EntityFrameworkCore;

namespace Control_Tower.Data
{
    public class TCContext : DbContext
    {
        public DbSet<Flight> Flights { get; set; }
        public DbSet<Passenger> Passengers { get; set; }

        public TCContext(DbContextOptions<TCContext> options) : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //}
    }
}

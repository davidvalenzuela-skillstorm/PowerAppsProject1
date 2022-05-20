#nullable disable
using Control_Tower.Data;
using Control_Tower.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Control_Tower.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
        private readonly CTContext _context;

        public PassengersController(CTContext context)
        {
            _context = context;
        }

        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengers()
        {
            return await _context.Passengers.ToListAsync();
        }

        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }

        // Get: api/Passengers/Name?name=[name]
        [HttpGet("Name")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersByName([FromQuery] string name)
        {
            var passengers = await _context.Passengers
                //.Where(p => p.Name == name) // Better to use "Conatins()" for ease of use
                .Where(p => p.Name.Contains(name))
                .ToListAsync();

            return passengers;
        }

        // Get: api/Passengers/Job?job=[job]
        [HttpGet("Job")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersByJob([FromQuery] string job)
        {
            var passengers = await _context.Passengers
                .Where(p => p.Job.Contains(job))
                .ToListAsync();

            return passengers;
        }

        // Get: api/Passengers/Jobless
        [HttpGet("Jobless")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersWithoutJob()
        {
            var passengers = await _context.Passengers
                .Where(p => p.Job == null || p.Job == "")
                .ToListAsync();

            return passengers;
        }

        // Get: api/Passengers/Email?email=[email]
        [HttpGet("Email")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersByEmail([FromQuery] string email)
        {
            var passengers = await _context.Passengers
                .Where(p => p.Email.Contains(email))
                .ToListAsync();

            return passengers;
        }

        // Get: api/Passengers/AgeBetween?age1=[age1]&&age2=[age2]
        [HttpGet("AgeBetween")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersWithAgeBetween([FromQuery] int age1, [FromQuery] int age2)
        {
            var passengers = await _context.Passengers
                .Where(p => p.Age >= age1 && p.Age <= age2)
                .ToListAsync();

            return passengers;
        }

        // Get: api/Passengers/BookingNumber/[bookingNumber]
        [HttpGet("BookingNumber/{bookingNumber}")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersByBookingNumber(int? flightID)
        {
            if (flightID == null || flightID < 0)
            {
                return NotFound();
            }

            var passengers = new List<Passenger>();
            var bookings = await _context.Bookings.ToArrayAsync();

            foreach (var booking in bookings)
            {
                Passenger currentPassenger = _context.Passengers.Find(booking.PassengerID);
                passengers.Add(currentPassenger);
            }

            return passengers;
        }

        // GET: api/Passengers/Params?ID=[ID]&&name=[name]&&job=[job]&&email=[email]&&age=[age]&&flightID=[flightID]
        [HttpGet("Params")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetPassengersWithParams([FromQuery] int? ID, [FromQuery] string name, [FromQuery] string job, [FromQuery] string email, [FromQuery] int? age, [FromQuery] int? flightID)
        {
            IQueryable<Passenger> query = _context.Passengers.AsQueryable();

            // Check ID
            if (ID != null && ID >= 100)
            {
                query = query.Where(passenger => passenger.ID == ID);
            }

            // Check name
            if (name != null && name != "")
            {
                query = query.Where(passenger => passenger.Name.Contains(name));
            }

            // Check job
            if (job != null && job != "")
            {
                query = query.Where(passenger => passenger.Job.Contains(job));
            }

            // Check email
            if (email != null && email != "")
            {
                query = query.Where(passenger => passenger.Email.Contains(email));
            }

            // Check age
            if (age != null && age >= 0)
            {
                query = query.Where(passenger => passenger.Age == age);
            }

            // Check flight ID
            if (flightID != null && flightID >= 0)
            {
                var bookings = await _context.Bookings
                    .Where(b => b.FlightID == flightID)
                    .ToArrayAsync();

                foreach (var booking in bookings)
                {
                    //query.Where(passenger => passenger.ID == booking.PassengerID);
                    query.TakeWhile(passenger => passenger.ID == booking.PassengerID);
                }
            }

            return query.ToList();
        }

        // PUT: api/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassenger(int id, Passenger passenger)
        {
            if (id != passenger.ID)
            {
                return BadRequest();
            }

            _context.Entry(passenger).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Passengers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostPassenger(Passenger passenger)
        {
            _context.Passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassenger", new { id = passenger.ID }, passenger);
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            var passenger = await _context.Passengers.FindAsync(id);
            if (passenger == null)
            {
                return NotFound();
            }

            _context.Passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassengerExists(int id)
        {
            return _context.Passengers.Any(e => e.ID == id);
        }
    }
}

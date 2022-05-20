using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Control_Tower.Data;
using Control_Tower.Models;

namespace Control_Tower.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly CTContext _context;

        public BookingsController(CTContext context)
        {
            _context = context;
        }

        // GET: api/Bookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
          if (_context.Bookings == null)
          {
              return NotFound();
          }
            return await _context.Bookings.ToListAsync();
        }

        // GET: api/Bookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
          if (_context.Bookings == null)
          {
              return NotFound();
          }
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        // PUT: api/Bookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(int id, Booking booking)
        {
            if (id != booking.ID)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
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

        // POST: api/Bookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking(Booking booking)
        {
            if (_context.Bookings == null)
            {
                return Problem("Entity set 'CTContext.Bookings'  is null.");
            }

            var flight = await _context.Flights.FindAsync(booking.FlightID);
            if (flight == null)
            {
                return NotFound();
            }

            var passenger = await _context.Passengers.FindAsync(booking.PassengerID);
            if (passenger == null)
            {
                return NotFound();
            }

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.ID }, booking);
        }

        // DELETE: api/Bookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Bookings/FromPassengerAndFlight?passengerID=[passengerID]&&flightID=[flightID]
        [HttpDelete("FromPassengerAndFlight")]
        public async Task<IActionResult> DeleteBooking([FromQuery] int passengerID, [FromQuery] int flightID)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }

            var bookings = await _context.Bookings
                .Where(booking => booking.PassengerID == passengerID && booking.FlightID == flightID)
                .ToListAsync();

            if (bookings == null || bookings.Count() <= 0)
            {
                return NotFound();
            }

            _context.Bookings.RemoveRange(bookings);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingExists(int id)
        {
            return (_context.Bookings?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}

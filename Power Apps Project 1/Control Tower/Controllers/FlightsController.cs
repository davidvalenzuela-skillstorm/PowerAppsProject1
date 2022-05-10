#nullable disable
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
    public class FlightsController : ControllerBase
    {
        private readonly CTContext _context;

        public FlightsController(CTContext context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            return await _context.Flights.ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // GET: api/Flights/DepartureBetween?date1=[date1]&&date2=[date2]
        [HttpGet("DepartureBetween")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlightsDepartingBetweenDateTime([FromQuery] DateTime date1, [FromQuery] DateTime date2)
        {
            var flights = await _context.Flights
                .Where(f => f.DepartureDateTime >= date1 && f.DepartureDateTime <= date2)
                .ToListAsync();

            return flights;
        }

        // GET: api/Flights/ArrivalBetween?date1=[date1]&&date2=[date2]
        [HttpGet("ArrivalBetween")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlightsArrivingBetweenDateTime([FromQuery] DateTime date1, [FromQuery] DateTime date2)
        {
            var flights = await _context.Flights
                .Where(f => f.ArrivalDateTime >= date1 && f.ArrivalDateTime <= date2)
                .ToListAsync();

            return flights;
        }

        // GET: api/Flights/DepartureAirport?airport=[airport]
        [HttpGet("DepartureAirport/{airport}")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlightsDepartingFromAirport(string airport)
        {
            var flights = await _context.Flights
                .Where(f => f.DepartureAirport.Contains(airport))
                .ToListAsync();

            return flights;
        }

        // GET: api/Flights/ArrivalAirport?airport=[airport]
        [HttpGet("ArrivalAirport/{airport}")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlightsArrivingToAirport(string airport)
        {
            var flights = await _context.Flights
                .Where(f => f.ArrivalAirport.Contains(airport))
                .ToListAsync();

            return flights;
        }

        // GET: api/Flights/RelatedPassengers?id=[id]
        [HttpGet("RelatedPassengers")]
        public async Task<ActionResult<IEnumerable<Passenger>>> GetRelatedPassengers(int id)
        {
            var passengers = await _context.Passengers
                .Where(p => p.FlightID == id)
                .ToListAsync();

            return passengers;
        }

        // GET: api/Flights/PassengerLimitBetween?limit1=[limit1]&&limit2=[limit2]
        [HttpGet("PassengerLimitBetween")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlightsWithPassengerLimitBetween([FromQuery] int limit1, [FromQuery] int limit2)
        {
            var flights = await _context.Flights
                .Where(f => f.PassengerLimit >= limit1 && f.PassengerLimit <= limit2)
                .ToListAsync();

            return flights;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.ID)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
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

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(Flight flight)
        {
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = flight.ID }, flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightExists(int id)
        {
            return _context.Flights.Any(e => e.ID == id);
        }
    }
}

import { Flight, FlightDataParams } from "../view-models/flight";
import { Passenger, PassengerDataParams } from "../view-models/passenger";

// Details about how to connect to the backend
const API =
{
   baseURL: "https://localhost:7174/api/",
   flightsController: "https://localhost:7174/api/Flights/",
   passengersController: "https://localhost:7174/api/Passengers/"
}

// Get list of all flight data
const getFlights = async function() : Promise<Flight[]>
{
   let data : Array<Flight>;
   data = [];

   await fetch(API.flightsController)
   .then(reponse => reponse.json())
   .then(content => data = content)
   .catch(err =>
   {
      console.error(`ERROR: Unable to retrieve all flights!\n${err}`);
      data = [];
   });

   return data;
}

// Get list of flight data that matches some query parameters
const getFlightsWithParams = async function(obj : FlightDataParams) : Promise<Flight[]>
{
   let data : Array<Flight>;
   data = [];

   // Sanitize parameters and prepare query
   let query = "Params?";
   if (obj.flightNumber)       query += "flightNumber="       + obj.flightNumber                + "&";
   if (obj.departureType)      query += "departureType="      + obj.departureType               + "&";
   if (obj.departureDateTime1) query += "departureDateTime1=" + obj.departureDateTime1.toJSON() + "&";
   if (obj.departureDateTime2) query += "departureDateTime2=" + obj.departureDateTime2.toJSON() + "&";
   if (obj.arrivalType)        query += "arrivalType="        + obj.arrivalType                 + "&";
   if (obj.arrivalDateTime1)   query += "arrivalDateTime1="   + obj.arrivalDateTime1.toJSON()   + "&";
   if (obj.arrivalDateTime2)   query += "arrivalDateTime2="   + obj.arrivalDateTime2.toJSON()   + "&";
   if (obj.departureAirport && obj.departureAirport !== "") query += "departureAirport=" + obj.departureAirport + "&";
   if (obj.arrivalAirport   && obj.arrivalAirport   !== "") query += "arrivalAirport="   + obj.arrivalAirport   + "&";
   if (obj.passengerLimit)     query += "passengerLimit="     + obj.passengerLimit;

   // Make the query
   await fetch(API.flightsController + query)
   .then(reponse => reponse.json())
   .then(content => data = content)
   .catch(err =>
   {
      console.error(`ERROR: Unable to retrieve flights with given parameters!\n${err}`);
      data = [];
   });

   return data;
}

// Edit a flight and return whether the operation was successful
const editFlight = async function(flight : Flight) : Promise<boolean>
{
   // Attempt to submit the edit
   const response = await fetch(API.flightsController + flight.id,
   {
      method: 'PUT',
      headers:
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(flight)
   });

   if (response.ok) return true;
   else console.error(`ERROR: Could not submit flight edit, reponse status is ${response.status}!`);
   return false;
}

// Delete a flight
const deleteFlight = async function(ID : number) : Promise<boolean>
{
   // Attempt to submit the deletion
   const response = await fetch(API.flightsController + ID,
   {
      method: 'DELETE',
      headers:
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(ID)
   });

   if (response.ok) return true;
   else console.error(`ERROR: Could not submit flight deletion, reponse status is ${response.status}!`);
   return false;
}

// Add a flight
const addFlight = async function(flight : Flight) : Promise<boolean>
{
   // Attempt to submit the addition
   const response = await fetch(API.flightsController,
   {
      method: 'POST',
      headers:
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(
      {
         departureDateTime: flight.departureDateTime,
         arrivalDateTime: flight.arrivalDateTime,
         departureAirport: flight.departureAirport,
         arrivalAirport: flight.arrivalAirport,
         passengerLimit: flight.passengerLimit
      })
   });

   if (response.ok) return true;
   else console.error(`ERROR: Could not submit flight addition, response status is ${response.status}!`);
   return false;
}

// Get list of all passenger data
const getPassengers = async function() : Promise<Passenger[]>
{
   let data : Array<Passenger>;
   data = [];

   await fetch(API.passengersController)
   .then(reponse => reponse.json())
   .then(content => data = content)
   .catch(err =>
   {
      console.error(`ERROR: Unable to retrieve all passengers!\n${err}`);
      data = [];
   });

   return data;
}

// Get list of passenger data that matches some query parameters
const getPassengersWithParams = async function(obj : PassengerDataParams) : Promise<Passenger[]>
{
   let data : Array<Passenger>;
   data = [];

   // Sanitize parameters and prepare query
   let query = "Params?";
   //if (obj.ID)          query += "ID="              + obj.ID                     + "&";
   if (obj.name)          query += "name="            + obj.name                   + "&";
   if (obj.job)           query += "job="             + obj.job                    + "&";
   if (obj.email)         query += "email="           + obj.email                  + "&";
   if (obj.age)           query += "age="             + obj.age                    + "&";
   if (obj.flightID)      query += "flightID="        + obj.flightID               + "&";

   // Make the query
   await fetch(API.passengersController + query)
   .then(reponse => reponse.json())
   .then(content => data = content)
   .catch(err =>
   {
      console.error(`ERROR: Unable to retrieve passengers with given parameters!\n${err}`);
      data = [];
   });

   return data;
}

// Edit a passenger and return whether the operation was successful
const editPassenger = async function(passenger : Passenger) : Promise<boolean>
{
   // Attempt to submit the edit
   const response = await fetch(API.passengersController + passenger.id,
   {
      method: 'PUT',
      headers:
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(passenger)
   });

   if (response.ok) return true;
   else console.error(`ERROR: Could not submit passenger edit, reponse status is ${response.status}!`);
   return false;
}

// Delete a passenger
const deletePassenger = async function(ID : number) : Promise<boolean>
{
   // Attempt to submit the deletion
   const response = await fetch(API.passengersController + ID,
   {
      method: 'DELETE',
      headers:
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(ID)
   });

   if (response.ok) return true;
   else console.error(`ERROR: Could not submit passengers deletion, reponse status is ${response.status}!`);
   return false;
}

// Add a passenger
const addPassenger = async function(passenger : Passenger) : Promise<boolean>
{
   // Attempt to submit the addition
   const response = await fetch(API.passengersController,
   {
      method: 'POST',
      headers:
      {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(
      {
         name: passenger.name,
         job: passenger.job,
         email: passenger.email,
         age: passenger.age,
         flightID: passenger.flightID
      })
   });

   if (response.ok) return true;
   else console.error(`ERROR: Could not submit passenger addition, response status is ${response.status}!`);
   return false;
}

// Get flights related to a passenger via their bookings
const getFlightsByPassengerBookings = async function(passengerID : number) : Promise<Flight[]>
{
   let data : Array<Flight>;
   data = [];

   await fetch(API.passengersController + "FlightsByBooking?passengerID=" + passengerID)
   .then(reponse => reponse.json())
   .then(content => data = content)
   .catch(err =>
   {
      console.error(`ERROR: Unable to retrieve all passengers!\n${err}`);
      data = [];
   });

   return data;
}

// All functions to export go here
const APIService =
{
   getFlights,
   getFlightsWithParams,
   editFlight,
   deleteFlight,
   addFlight,
   getPassengers,
   getPassengersWithParams,
   editPassenger,
   deletePassenger,
   addPassenger,
   getFlightsByPassengerBookings
}

export default APIService;
import { Flight, FlightDataParams } from "../view-models/flight";

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

// All functions to export go here
const APIService =
{
   getFlights,
   getFlightsWithParams
}

export default APIService;
import Flight from './../view-models/flight';
//import Passenger from './../view-models/passenger';

// Details about how to connect to the backend
const API =
{
   baseURL: "https://localhost:7174/api/",
   flightsController: "https://localhost:7174/api/Flights/",
   passengersController: "https://localhost:7174/api/Passengers/"
}

const getFlights = async function()
{
   let data : Array<Flight>;
   data = [];

   await fetch(API.flightsController)
   .then(reponse => reponse.json())
   .then(content => data = content)
   .catch(err =>
   {
      console.error(`ERROR: Unable to retrieve flights!\n${err}`);
      data = [];
   });

   return data;
}

// All functions to export go here
const APIService =
{
   getFlights
}

export default APIService;
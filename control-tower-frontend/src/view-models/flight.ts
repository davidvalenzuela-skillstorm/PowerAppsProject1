// Flight model
export interface Flight
{
   id : number,
   departureDateTime : string,
   arrivalDateTime : string,
   departureAirport : string,
   arrivalAirport : string,
   passengerLimit : number
}

// Useful type for flight data queries
export type FlightDataParams =
{
   flightNumber : number | null,
   departureType: number,
   departureDateTime1 : Date | null,
   departureDateTime2 : Date | null,
   arrivalType: number,
   arrivalDateTime1 : Date | null,
   arrivalDateTime2 : Date | null,
   departureAirport : string,
   arrivalAirport : string,
   passengerLimit : number | null
}
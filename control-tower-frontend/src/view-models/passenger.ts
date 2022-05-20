// Passenger model
export interface Passenger
{
   id : number,
   name : string,
   job : string,
   email : string,
   age : number
}

// Useful type for flight data queries
export type PassengerDataParams =
{
   name : string | null,
   job : string | null,
   email : string | null,
   age : number | null,
   flightID : number | null
}
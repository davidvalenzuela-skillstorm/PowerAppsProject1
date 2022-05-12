import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

var testData = [
   {flightNumber: 101, departureDate: "4 June 2018", departureTime: "11:00", arrivalDate: "4 June 2018", arrivalTime: "12:00", departureAirport: "Los Angeles", arrivalAirport: "Las Vegas", passengerLimit: 300},
   {flightNumber: 102, departureDate: "4 June 2018", departureTime: "11:00", arrivalDate: "4 June 2018", arrivalTime: "12:00", departureAirport: "Los Angeles", arrivalAirport: "Las Vegas", passengerLimit: 300},
   {flightNumber: 103, departureDate: "4 June 2018", departureTime: "11:00", arrivalDate: "4 June 2018", arrivalTime: "12:00", departureAirport: "Los Angeles", arrivalAirport: "Las Vegas", passengerLimit: 300}
]

class FlightsView extends React.Component<any, any>
{
   render()
   {
      return (
         <div className="flights_view">
            <h1>Managing Flights</h1>
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Flight Number</TableCell>
                        <TableCell align="right">Departure Date</TableCell>
                        <TableCell align="right">Departure Time</TableCell>
                        <TableCell align="right">Arrival Date</TableCell>
                        <TableCell align="right">Arrival Time</TableCell>
                        <TableCell align="right">Departure Airport</TableCell>
                        <TableCell align="right">Arrival Airport</TableCell>
                        <TableCell align="right">Passenger Limit</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {testData.map((entry) => (
                        <TableRow key={entry.flightNumber}>
                           <TableCell>{entry.flightNumber}</TableCell>
                           <TableCell align="right">{entry.departureDate}</TableCell>
                           <TableCell align="right">{entry.departureTime}</TableCell>
                           <TableCell align="right">{entry.arrivalDate}</TableCell>
                           <TableCell align="right">{entry.arrivalTime}</TableCell>
                           <TableCell align="right">{entry.departureAirport}</TableCell>
                           <TableCell align="right">{entry.arrivalAirport}</TableCell>
                           <TableCell align="right">{entry.passengerLimit}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
         </div>
      );
   }
}

export default FlightsView;
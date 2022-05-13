import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import Flight from '../view-models/flight';

type FlightDataTableProps =
{
   flightData : Array<Flight>;
};

class FlightDataTable extends React.Component<FlightDataTableProps, any>
{
   render(): React.ReactNode {
      return (
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Flight Number</TableCell>
                     <TableCell align="right">Departure Date/Time</TableCell>
                     <TableCell align="right">Arrival Date/Time</TableCell>
                     <TableCell align="right">Departure Airport</TableCell>
                     <TableCell align="right">Arrival Airport</TableCell>
                     <TableCell align="right">Passenger Limit</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {this.props.flightData.map((entry) => (
                     <TableRow key={entry.id}>
                        <TableCell>{entry.id}</TableCell>
                        <TableCell align="right">{entry.departureDateTime}</TableCell>
                        <TableCell align="right">{entry.arrivalDateTime}</TableCell>
                        <TableCell align="right">{entry.departureAirport}</TableCell>
                        <TableCell align="right">{entry.arrivalAirport}</TableCell>
                        <TableCell align="right">{entry.passengerLimit}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   }
}

export default FlightDataTable;
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import APIService from '../../services/apiService';
import Flight from '../../view-models/flight';

type FlightsViewProps =
{
   data : Array<Flight>
};

class FlightsView extends React.Component<any, FlightsViewProps>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         data: []
      }
   }

   componentDidMount()
   {
      // Load all flight data
      APIService.getFlights().then(flightData => this.setState({data: flightData}))
   }

   render()
   {
      if (this.state.data.length <= 0)
      {
         return (
            <div className='flights_view'>
               <h1>Managing Flights</h1>
               <h2>No entries found</h2>
            </div>
         );
      }
      else
      {
         return (
            <div className='flights_view'>
               <h1>Managing Flights</h1>
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
                        {this.state.data.map((entry) => (
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
               <br />
               <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
            </div>
         );
      }
   }
}

export default FlightsView;
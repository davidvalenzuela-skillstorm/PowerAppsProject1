import { Modal, Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React from 'react';
import APIService from '../services/apiService';
import { Flight } from '../view-models/flight';
import { Passenger } from '../view-models/passenger';

const PassengerBookingsMenuStyle = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '80%',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

type PassengerBookingsProps =
{
   open : boolean,
   onClose : Function,
   passenger : Passenger
}

type PassengerBookingsState =
{
   flightData : Array<Flight>
}

class PassengerBookings extends React.Component<PassengerBookingsProps, PassengerBookingsState>
{
   constructor(props : PassengerBookingsProps)
   {
      super(props);
      this.state =
      {
         flightData: []
      };
      this.loadFilghtData = this.loadFilghtData.bind(this);
   }

   componentDidMount()
   {
      this.loadFilghtData();
   }

   loadFilghtData()
   {
      APIService.getFlightsByPassengerBookings(this.props.passenger.id)
         .then(data => this.setState({flightData: data}));
   }

   render()
   {
      return (
         <Modal
               open={this.props.open}
               onClose={() => this.props.onClose()}
               aria-labelledby="menuTitle"
               aria-describedby="menuBody"
            >
            <Box sx={PassengerBookingsMenuStyle}>
               <Typography id="menuTitle" variant="h6" component="h2">
                  Bookings for passenger {this.props.passenger.name} (with ID {this.props.passenger.id})
               </Typography>
               <Typography id="menuBody" component="div">
                  <br />
                  <TableContainer component={Paper}>
                     <Table>
                        <TableHead>
                           <TableRow>
                              <TableCell>Booking number</TableCell>
                              <TableCell align="left">Flight description</TableCell>
                              <TableCell>Remove booking</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {this.state.flightData.map((entry) => (
                              <TableRow key={entry.id}>
                                 <TableCell>{entry.id}</TableCell>
                                 <TableCell align="left">Departing from {entry.departureAirport} on {entry.departureDateTime} and arriving at {entry.arrivalAirport} on {entry.arrivalDateTime}.</TableCell>
                                 <TableCell><Button variant="outlined" size="small">&#10006;</Button></TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  {this.state.flightData.length <= 0 &&
                  <h2 style={{textAlign: 'center'}}>No entries found</h2>}
               </Typography>
            </Box>
         </Modal>
      );
   }
}

export default PassengerBookings;
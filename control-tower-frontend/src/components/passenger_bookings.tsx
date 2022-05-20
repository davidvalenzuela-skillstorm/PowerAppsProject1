import { Modal, Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@mui/material';
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
   flightData : Array<Flight>,
   newFlightBooking : number
}

class PassengerBookings extends React.Component<PassengerBookingsProps, PassengerBookingsState>
{
   constructor(props : PassengerBookingsProps)
   {
      super(props);
      this.state =
      {
         flightData: [],
         newFlightBooking: 0
      };
      this.loadFilghtData = this.loadFilghtData.bind(this);
      this.deleteFlightBooking = this.deleteFlightBooking.bind(this);
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

   addFlightBooking()
   {
      // Don't proceed if the flight number is invalid
      if (this.state.newFlightBooking < 0) return;

      // Submit booking addition
      APIService.addBookingWithPassengerAndFlight(this.props.passenger.id, this.state.newFlightBooking)
         .then(() => this.loadFilghtData());
   }

   deleteFlightBooking(flightID : number)
   {
      APIService.deleteBookingWithPassengerAndFlight(this.props.passenger.id, flightID)
         .then(() => this.loadFilghtData());
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
               <Typography id="menuTitle" variant="h6" component="h2" color="primary">
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
                                 <TableCell align="left">
                                    Departing from {entry.departureAirport} on {new Date(entry.departureDateTime).toLocaleString()} and arriving at {entry.arrivalAirport} on {new Date(entry.arrivalDateTime).toLocaleString()}.
                                 </TableCell>
                                 <TableCell>
                                    <Button
                                       variant="outlined"
                                       size="small"
                                       onClick={() => this.deleteFlightBooking(entry.id)}
                                    >&#10006;</Button>
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
                  {this.state.flightData.length <= 0 &&
                  <>
                     <br />
                     <Typography
                        id="menuTitle"
                        variant="h6"
                        component="h2"
                        color="secondary"
                        textAlign={'center'}
                     >
                        No entries found
                     </Typography>
                  </>}
                  <br />
                  <span style={{color: 'white', paddingRight: '20px'}}>Add new flight booking:</span>
                  <TextField
                     label="New Flight Booking"
                     variant="outlined"
                     type="number"
                     size="small"
                     value={this.state.newFlightBooking || ""}
                     onChange={(event) => this.setState({newFlightBooking: parseInt(event.target.value)})}
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant='contained' onClick={() => this.addFlightBooking()}>Add new booking</Button>
               </Typography>
            </Box>
         </Modal>
      );
   }
}

export default PassengerBookings;
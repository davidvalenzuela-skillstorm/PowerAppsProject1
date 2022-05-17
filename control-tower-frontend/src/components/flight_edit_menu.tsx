import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import APIService from '../services/apiService';
import { Flight } from '../view-models/flight';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

class FlightEditMenu extends React.Component<any, Flight>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         id: this.props.item.id,
         departureDateTime: this.props.item.departureDateTime,
         arrivalDateTime: this.props.item.arrivalDateTime,
         departureAirport: this.props.item.departureAirport,
         arrivalAirport: this.props.item.arrivalAirport,
         passengerLimit: this.props.item.passengerLimit
      }
      this.submitFlightEdit = this.submitFlightEdit.bind(this);
      this.resetModifiedFlightData = this.resetModifiedFlightData.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
   }

   submitFlightEdit()
   {
      // Attempt editing a flight item
      APIService.editFlight(this.state)
      .then((response) => {
         // If it goes through, update data table and close this menu
         this.props.update();
         if (response) this.props.onClose();
      });
   }

   resetModifiedFlightData()
   {
      this.setState(
      {
         id: this.props.item.id,
         departureDateTime: this.props.item.departureDateTime,
         arrivalDateTime: this.props.item.arrivalDateTime,
         departureAirport: this.props.item.departureAirport,
         arrivalAirport: this.props.item.arrivalAirport,
         passengerLimit: this.props.item.passengerLimit
      });
   }

   closeMenu()
   {
      this.resetModifiedFlightData();
      this.props.onClose();
   }

   render()
   {
      return (
         <Modal
               open={this.props.open}
               onClose={() => this.closeMenu()}
               aria-labelledby="editItemMenuTitle"
               aria-describedby="editItemMenuBody"
            >
               <Box sx={style}>
                  <Typography id="editItemMenuTitle" variant="h6" component="h2">
                     Editing Flight {this.props.item.id}
                  </Typography>
                  <Typography id="editItemMenuBody" component="div">
                     <br />
                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                           label="Departure Date"
                           value={this.state.departureDateTime}
                           onChange={(newValue) => this.setState({departureDateTime: newValue ?? new Date().toJSON()})}
                           renderInput={
                              (params) => <TextField {...params} />
                           }
                        />
                        <br />
                        <br />
                        <Divider />
                        <br />
                        <DateTimePicker
                           label="Arrival Date"
                           value={this.state.arrivalDateTime}
                           onChange={(newValue) => this.setState({arrivalDateTime: newValue ?? new Date().toJSON()})}
                           renderInput={
                              (params) => <TextField {...params} />
                           }
                        />
                     </LocalizationProvider>
                     <br />
                     <br />
                     <Divider />
                     <br />
                     <TextField
                        label="Departure Airport"
                        variant="outlined"
                        size="small"
                        value={this.state.departureAirport}
                        onChange={(event) => this.setState({departureAirport: event.target.value})}
                     />
                     <br />
                     <br />
                     <Divider />
                     <br />
                     <TextField
                        label="Arrival Airport"
                        variant="outlined"
                        size="small"
                        value={this.state.arrivalAirport}
                        onChange={(event) => this.setState({arrivalAirport: event.target.value})}
                     />
                     <br />
                     <br />
                     <Divider />
                     <br />
                     <TextField
                        label="Passenger Limit"
                        variant="outlined"
                        type="number"
                        size="small"
                        value={this.state.passengerLimit || ""}
                        onChange={(event) => this.setState({passengerLimit: parseInt(event.target.value)})}
                     />
                     <br />
                     <br />
                     <Button variant="outlined" onClick={() => this.closeMenu()}>Cancel</Button>
                     &nbsp;&nbsp;&nbsp;&nbsp;
                     <Button variant="contained" onClick={() => this.submitFlightEdit()}>Submit</Button>
                  </Typography>
               </Box>
            </Modal>
      );
   }
}

export default FlightEditMenu;
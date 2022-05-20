import { Modal, Box, Typography, TextField, Divider, Button } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import APIService from '../services/apiService';
import { Flight } from '../view-models/flight';

const FlightAddMenuStyle = {
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

type FlightAddMenuProps =
{
   open : boolean,
   onClose : Function,
   update : Function
}

interface FlightAddMenuState extends Flight
{
   departureDateTimeError     : string,
   departureDateTimeHasError  : boolean,
   arrivalDateTimeError       : string,
   arrivalDateTimeHasError    : boolean,
   departureAirportError      : string,
   departureAirportHasError   : boolean,
   arrivalAirportError        : string,
   arrivalAirportHasError     : boolean,
   passengerLimitError        : string,
   passengerLimitHasError     : boolean
}

class FlightAddMenu extends React.Component<FlightAddMenuProps, FlightAddMenuState>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         id: -1,
         departureDateTime: "",
         arrivalDateTime: "",
         departureAirport: "",
         arrivalAirport: "",
         passengerLimit: 0,
         departureDateTimeError: "",
         departureDateTimeHasError: false,
         arrivalDateTimeError: "",
         arrivalDateTimeHasError: false,
         departureAirportError: "",
         departureAirportHasError: false,
         arrivalAirportError: "",
         arrivalAirportHasError: false,
         passengerLimitError: "",
         passengerLimitHasError: false
      }
      this.submitFlightAddition = this.submitFlightAddition.bind(this);
      this.validation = this.validation.bind(this);
   }

   submitFlightAddition()
   {
      // Run validation and continue if data is good
      if (!this.validation()) return;

      // Attempt adding a flight item
      APIService.addFlight(this.state)
      .then((response) => {
         // If it goes through, update data table and close this menu
         this.props.update();
         if (response) this.props.onClose();
      });
   }

   validation() : boolean
   {
      // Start with the assumption that the data is good, and look for reasons why it might not be
      let dataLooksGood = true;
      let errorStates =
      {
         ddtError: "",
         ddtHasError: false,
         adtError: "",
         adtHasError: false,
         daError: "",
         daHasError: false,
         aaError: "",
         aaHasError: false,
         plError: "",
         plHasError: false
      }

      // Check that the departure date is not empty
      if (this.state.departureDateTime && this.state.departureDateTime !== "")
      {
         // Check that the departure date is a valid date
         if (new Date(this.state.departureDateTime).toString() === 'Invalid Date')
         {
            errorStates.ddtError = "This date is not valid";
            errorStates.ddtHasError = true;
            dataLooksGood = false;
         }
      }
      else // Departure date is empty
      {
         errorStates.ddtError = "This field should not be empty";
         errorStates.ddtHasError = true;
         dataLooksGood = false;
      }

      // Check that the arrival date is not empty
      if (this.state.arrivalDateTime && this.state.arrivalDateTime !== "")
      {
         // Check that the arrival date is a valid date
         if (new Date(this.state.arrivalDateTime).toString() === 'Invalid Date')
         {
            errorStates.adtError = "This date is not valid";
            errorStates.adtHasError = true;
            dataLooksGood = false;
         }
      }
      else // Arrival date is empty
      {
         errorStates.adtError = "This field should not be empty";
         errorStates.adtHasError = true;
         dataLooksGood = false;
      }

      // Check that the departure airport is not empty
      if (!this.state.departureAirport || this.state.departureAirport === "")
      {
         errorStates.daError = "This field should not be empty";
         errorStates.daHasError = true;
         dataLooksGood = false;
      }

      // Check that the arrival airport is not empty
      if (!this.state.arrivalAirport || this.state.arrivalAirport === "")
      {
         errorStates.aaError = "This field should not be empty";
         errorStates.aaHasError = true;
         dataLooksGood = false;
      }

      // Check that the passenger limit is not empty
      if (this.state.passengerLimit)
      {
         // Check that the passenger limit is not NaN
         if (isNaN(this.state.passengerLimit))
         {
            errorStates.plError = "The value for this field is invalid";
            errorStates.plHasError = true;
            dataLooksGood = false;
         }
         else
         {
            // Check that the passenger limit is not less than 1
            if (this.state.passengerLimit < 1)
            {
               errorStates.plError = "This value should not be less than 1";
               errorStates.plHasError = true;
               dataLooksGood = false;
            }
         }
      }
      else // Passenger limit is empty
      {
         errorStates.plError = "This field should not be empty";
         errorStates.plHasError = true;
         dataLooksGood = false;
      }

      // Update error states on form components
      this.setState(
      {
         departureDateTimeError: errorStates.ddtError,
         departureDateTimeHasError: errorStates.ddtHasError,
         arrivalDateTimeError: errorStates.adtError,
         arrivalDateTimeHasError: errorStates.adtHasError,
         departureAirportError: errorStates.daError,
         departureAirportHasError: errorStates.daHasError,
         arrivalAirportError: errorStates.aaError,
         arrivalAirportHasError: errorStates.aaHasError,
         passengerLimitError: errorStates.plError,
         passengerLimitHasError: errorStates.plHasError
      });

      // Return whether we found the data is good
      if (dataLooksGood) return true;
      return false;
   }

   render()
   {
      return (
         <Modal
               open={this.props.open}
               onClose={() => this.props.onClose()}
               aria-labelledby="addItemMenuTitle"
               aria-describedby="addItemMenuBody"
            >
            <Box sx={FlightAddMenuStyle}>
               <Typography id="addItemMenuTitle" variant="h6" component="h2" color="primary">
                  Adding New Flight
               </Typography>
               <Typography id="addItemMenuBody" component="div">
                  <br />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                     <DateTimePicker
                        label="Departure Date"
                        value={this.state.departureDateTime}
                        onChange={(newValue) => this.setState({departureDateTime: newValue ?? ""})}
                        renderInput={
                           (params) =>
                              <TextField
                                 {...params}
                                 error={this.state.departureDateTimeHasError}
                                 helperText={this.state.departureDateTimeError}
                              />
                        }
                     />
                     <br />
                     <br />
                     <Divider />
                     <br />
                     <DateTimePicker
                        label="Arrival Date"
                        value={this.state.arrivalDateTime}
                        onChange={(newValue) => this.setState({arrivalDateTime: newValue ?? ""})}
                        renderInput={
                           (params) =>
                              <TextField
                                 {...params}
                                 error={this.state.arrivalDateTimeHasError}
                                 helperText={this.state.arrivalDateTimeError}
                              />
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
                     error={this.state.departureAirportHasError}
                     helperText={this.state.departureAirportError}
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
                     error={this.state.arrivalAirportHasError}
                     helperText={this.state.arrivalAirportError}
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
                     error={this.state.passengerLimitHasError}
                     helperText={this.state.passengerLimitError}
                  />
                  <br />
                  <br />
                  <Button variant="outlined" onClick={() => this.props.onClose()}>Cancel</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="contained" onClick={() => this.submitFlightAddition()}>Submit</Button>
               </Typography>
            </Box>
         </Modal>
      );
   }
}

export default FlightAddMenu;
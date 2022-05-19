import { Modal, Box, Typography, TextField, Divider, Button } from '@mui/material';
import React from 'react';
import APIService from '../services/apiService';
import { Passenger } from '../view-models/passenger';

const PassengerAddMenuStyle = {
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

type PassengerAddMenuProps =
{
   open : boolean,
   onClose : Function,
   update : Function
}

interface PassengerAddMenuState extends Passenger
{
   nameError             : string,
   nameHasError          : boolean,
   jobError              : string,
   jobHasError           : boolean,
   emailError            : string,
   emailHasError         : boolean,
   ageError              : string,
   ageHasError           : boolean,
   flightIDError    : string,
   flightIDHasError : boolean
}

class PassengerAddMenu extends React.Component<PassengerAddMenuProps, PassengerAddMenuState>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         id: -1,
         name: "",
         job: "",
         email: "",
         age: 0,
         flightID: 0,
         nameError: "",
         nameHasError: false,
         jobError: "",
         jobHasError: false,
         emailError: "",
         emailHasError: false,
         ageError: "",
         ageHasError: false,
         flightIDError: "",
         flightIDHasError: false
      }
      this.submitPassengerAddition = this.submitPassengerAddition.bind(this);
      this.validation = this.validation.bind(this);
   }

   submitPassengerAddition()
   {
      // Run validation and continue if data is good
      if (!this.validation()) return;

      // Attempt adding a passenger item
      APIService.addPassenger(this.state)
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
         nError: "",
         nHasError: false,
         jError: "",
         jHasError: false,
         eError: "",
         eHasError: false,
         aError: "",
         aHasError: false,
         bnError: "",
         bnHasError: false
      };

      // Check that the name is not empty
      if (!this.state.name || this.state.name === "")
      {
         errorStates.nError = "This field should not be empty";
         errorStates.nHasError = true;
         dataLooksGood = false;
      }

      // Check that the job is not empty // Actually, job can be empty
      // if (!this.state.job || this.state.job === "")
      // {
      //    errorStates.jError = "This field should not be empty";
      //    errorStates.jHasError = true;
      //    dataLooksGood = false;
      // }

      // Check that the email is not empty
      if (!this.state.email || this.state.email === "")
      {
         errorStates.eError = "This field should not be empty";
         errorStates.eHasError = true;
         dataLooksGood = false;
      }

      // Check that the age is not empty
      if (this.state.age)
      {
         // Check that the age is not NaN
         if (isNaN(this.state.age))
         {
            errorStates.aError = "The value for this field is invalid";
            errorStates.aHasError = true;
            dataLooksGood = false;
         }
         else
         {
            // Check that the age is not less than 0
            if (this.state.age < 0)
            {
               errorStates.aError = "This value should not be less than 1";
               errorStates.aHasError = true;
               dataLooksGood = false;
            }
         }
      }
      else // Age is empty
      {
         errorStates.aError = "This field should not be empty";
         errorStates.aHasError = true;
         dataLooksGood = false;
      }

      // Check that the booking number is not empty
      if (this.state.flightID)
      {
         // Check that the booking number is not NaN
         if (isNaN(this.state.flightID))
         {
            errorStates.bnError = "The value for this field is invalid";
            errorStates.bnHasError = true;
            dataLooksGood = false;
         }
         else
         {
            // Check that the booking number is not less than 0
            if (this.state.flightID < 0)
            {
               errorStates.bnError = "This value should not be less than 1";
               errorStates.bnHasError = true;
               dataLooksGood = false;
            }
         }
      }
      else // Booking number is empty
      {
         errorStates.bnError = "This field should not be empty";
         errorStates.bnHasError = true;
         dataLooksGood = false;
      }

      // Update error states on form components
      this.setState(
      {
         nameError: errorStates.nError,
         nameHasError: errorStates.nHasError,
         jobError: errorStates.jError,
         jobHasError: errorStates.jHasError,
         emailError: errorStates.eError,
         emailHasError: errorStates.eHasError,
         ageError: errorStates.aError,
         ageHasError: errorStates.aHasError,
         flightIDError: errorStates.bnError,
         flightIDHasError: errorStates.bnHasError
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
            <Box sx={PassengerAddMenuStyle}>
               <Typography id="addItemMenuTitle" variant="h6" component="h2">
                  Adding New Passenger
               </Typography>
               <Typography id="addItemMenuBody" component="div">
                  <br />
                  <TextField
                     label="Name"
                     variant="outlined"
                     size="small"
                     value={this.state.name}
                     onChange={(event) => this.setState({name: event.target.value})}
                     error={this.state.nameHasError}
                     helperText={this.state.nameError}
                  />
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <TextField
                     label="Job"
                     variant="outlined"
                     size="small"
                     value={this.state.job}
                     onChange={(event) => this.setState({job: event.target.value})}
                     error={this.state.jobHasError}
                     helperText={this.state.jobError}
                  />
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <TextField
                     label="Email"
                     variant="outlined"
                     size="small"
                     value={this.state.email}
                     onChange={(event) => this.setState({email: event.target.value})}
                     error={this.state.emailHasError}
                     helperText={this.state.emailError}
                  />
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <TextField
                     label="Age"
                     variant="outlined"
                     type="number"
                     size="small"
                     value={this.state.age || ""}
                     onChange={(event) => this.setState({age: parseInt(event.target.value)})}
                     error={this.state.ageHasError}
                     helperText={this.state.ageError}
                  />
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <TextField
                     label="Booking Number"
                     variant="outlined"
                     type="number"
                     size="small"
                     value={this.state.flightID || ""}
                     onChange={(event) => this.setState({flightID: parseInt(event.target.value)})}
                     error={this.state.flightIDHasError}
                     helperText={this.state.flightIDError}
                  />
                  <br />
                  <br />
                  <Button variant="outlined" onClick={() => this.props.onClose()}>Cancel</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="contained" onClick={() => this.submitPassengerAddition()}>Submit</Button>
               </Typography>
            </Box>
         </Modal>
      );
   }
}

export default PassengerAddMenu;
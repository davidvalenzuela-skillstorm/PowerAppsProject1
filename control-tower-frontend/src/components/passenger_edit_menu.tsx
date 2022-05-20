import { Modal, Box, Typography, TextField, Divider, Button } from '@mui/material';
import React from 'react';
import APIService from '../services/apiService';
import { Passenger } from '../view-models/passenger';

const PassengerEditMenuStyle = {
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

class PassengerEditMenu extends React.Component<any, Passenger>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         id: this.props.item.id,
         name: this.props.item.name,
         job: this.props.item.job,
         email: this.props.item.email,
         age: this.props.item.age
      }
      this.submitPassengerEdit = this.submitPassengerEdit.bind(this);
      this.resetModifiedPassengerData = this.resetModifiedPassengerData.bind(this);
      this.closeMenu = this.closeMenu.bind(this);
   }

   submitPassengerEdit()
   {
      // Attempt editing a passenger item
      APIService.editPassenger(this.state)
      .then((response) => {
         // If it goes through, update data table and close this menu
         this.props.update();
         if (response) this.props.onClose();
      });
   }

   resetModifiedPassengerData()
   {
      this.setState(
      {
         id: this.props.item.ID,
         name: this.props.item.name,
         job: this.props.item.job,
         email: this.props.item.email,
         age: this.props.item.age
      });
   }

   closeMenu()
   {
      this.resetModifiedPassengerData();
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
            <Box sx={PassengerEditMenuStyle}>
               <Typography id="editItemMenuTitle" variant="h6" component="h2">
                  Editing Passenger {this.props.item.name} (with ID {this.props.item.ID})
               </Typography>
               <Typography id="editItemMenuBody" component="div">
                  <br />
                  <TextField
                     label="Name"
                     variant="outlined"
                     size="small"
                     value={this.state.name}
                     onChange={(event) => this.setState({name: event.target.value})}
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
                  />
                  <br />
                  <br />
                  <Button variant="outlined" onClick={() => this.closeMenu()}>Cancel</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="contained" onClick={() => this.submitPassengerEdit()}>Submit</Button>
               </Typography>
            </Box>
         </Modal>
      );
   }
}

export default PassengerEditMenu;
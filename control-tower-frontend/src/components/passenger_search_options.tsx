import { Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Divider, Button } from '@mui/material';
import React from 'react';
import { PassengerDataParams } from '../view-models/passenger';

class PassengerSearchOptions extends React.Component<any, PassengerDataParams>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         name: "",
         job: "",
         email: "",
         age: null,
         flightID: null
      }
   }

   render()
   {
      return (
         <Accordion>
            <AccordionSummary expandIcon="&#9660;">
               <Typography>Search Options</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{textAlign: "left"}}>
               <span className='search_options_label'>Filter by name:</span>
               <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={this.state.name || ""}
                  onChange={(event) => this.setState({name: event.target.value})}
               />
               <Divider />
               <br />
               <span className='search_options_label'>Filter job:</span>
               <TextField
                  label="Job"
                  variant="outlined"
                  size="small"
                  value={this.state.job || ""}
                  onChange={(event) => this.setState({job: event.target.value})}
               />
               <Divider />
               <br />
               <span className='search_options_label'>Filter by email:</span>
               <TextField
                  label="Email"
                  variant="outlined"
                  size="small"
                  value={this.state.email || ""}
                  onChange={(event) => this.setState({email: event.target.value})}
               />
               <Divider />
               <br />
               <span className='search_options_label'>Filter by age:</span>
               <TextField
                  label="Age"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={this.state.age || ""}
                  onChange={(event) => this.setState({age: parseInt(event.target.value)})}
               />
               <Divider />
               <br />
               <span className='search_options_label'>Filter by booking number:</span>
               <TextField
                  label="Booking number"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={this.state.flightID || ""}
                  onChange={(event) => this.setState({flightID: parseInt(event.target.value)})}
               />
               <br />
               <br />
               <Button variant="outlined" onClick={() => this.props.search(this.state)}>Search</Button>
            </AccordionDetails>
         </Accordion>
      );
   }
}

export default PassengerSearchOptions;
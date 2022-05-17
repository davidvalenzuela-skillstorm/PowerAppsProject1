import { Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Divider, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import { FlightDataParams } from '../view-models/flight';

class FlightSearchOptions extends React.Component<any, FlightDataParams>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         flightNumber: null,
         departureType: 1,
         departureDateTime1: null,
         departureDateTime2: null,
         arrivalType: 1,
         arrivalDateTime1: null,
         arrivalDateTime2: null,
         departureAirport: "",
         arrivalAirport: "",
         passengerLimit: null
      }
   }

   render()
   {
      // Render the date/time inputs appropriately
      let departuredatetime : JSX.Element;
      let arrivaldatetime   : JSX.Element;

      if (this.state.departureType < 2)
      {
         departuredatetime = (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DateTimePicker
                  label="Departure Date"
                  value={this.state.departureDateTime1}
                  onChange={(newValue) => this.setState({departureDateTime1: newValue ?? new Date(), departureDateTime2: new Date(0)})}
                  renderInput={
                     (params) => <TextField {...params} />
                  }
               />
            </LocalizationProvider>
         );
      }
      else
      {
         departuredatetime = (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DateTimePicker
                  label="First Departure Date"
                  value={this.state.departureDateTime1}
                  onChange={(newValue) => this.setState({departureDateTime1: newValue ?? new Date()})}
                  renderInput={
                     (params) => <TextField {...params} />
                  }
               />
               <DateTimePicker
                  label="Second Departure Date"
                  value={this.state.departureDateTime2}
                  onChange={(newValue) => this.setState({departureDateTime2: newValue ?? new Date()})}
                  renderInput={
                     (params) => <TextField {...params} />
                  }
               />
            </LocalizationProvider>
         );
      }

      if (this.state.arrivalType < 2)
      {
         arrivaldatetime = (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DateTimePicker
                  label="Arrival Date"
                  value={this.state.arrivalDateTime1}
                  onChange={(newValue) => this.setState({arrivalDateTime1: newValue ?? new Date(), arrivalDateTime2: new Date(0)})}
                  renderInput={
                     (params) => <TextField {...params} />
                  }
               />
            </LocalizationProvider>
         );
      }
      else
      {
         arrivaldatetime = (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
               <DateTimePicker
                  label="First Arrival Date"
                  value={this.state.arrivalDateTime1}
                  onChange={(newValue) => this.setState({arrivalDateTime1: newValue ?? new Date()})}
                  renderInput={
                     (params) => <TextField {...params} />
                  }
               />
               <DateTimePicker
                  label="Second Arrival Date"
                  value={this.state.arrivalDateTime2}
                  onChange={(newValue) => this.setState({arrivalDateTime2: newValue ?? new Date()})}
                  renderInput={
                     (params) => <TextField {...params} />
                  }
               />
            </LocalizationProvider>
         );
      }

      // Render the component
      return (
         <Accordion>
            <AccordionSummary expandIcon="&#9660;">
               <Typography>Search Options</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{textAlign: "left"}}>
               <span className='search_options_label'>Filter by flight number:</span>
               <TextField
                  label="Flight Number"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={this.state.flightNumber || ""}
                  onChange={(event) => this.setState({flightNumber: parseInt(event.target.value)})}
               />
               <Divider />
               <br />
               <span className='search_options_label'>Filter by departure date/time:</span>
               <Select
                  value={this.state.departureType.toString()}
                  onChange={(event : SelectChangeEvent) => this.setState({departureType: parseInt(event.target.value)})}
               >
                  <MenuItem value={0}>Before</MenuItem>
                  <MenuItem value={1}>After</MenuItem>
                  <MenuItem value={2}>Between</MenuItem>
               </Select>
               {departuredatetime}
               <Divider />
               <br />
               <span className='search_options_label'>Filter by arrival date/time:</span>
               <Select
                  value={this.state.arrivalType.toString()}
                  onChange={(event : SelectChangeEvent) => this.setState({arrivalType: parseInt(event.target.value)})}
               >
                  <MenuItem value={0}>Before</MenuItem>
                  <MenuItem value={1}>After</MenuItem>
                  <MenuItem value={2}>Between</MenuItem>
               </Select>
               {arrivaldatetime}
               <Divider />
               <br />
               <span className='search_options_label'>Filter by airports:</span>
               <TextField
                  label="Departure Airport"
                  variant="outlined"
                  size="small"
                  value={this.state.departureAirport}
                  onChange={(event) => this.setState({departureAirport: event.target.value})}
               />
               <TextField
                  label="Arrival Airport"
                  variant="outlined"
                  size="small"
                  value={this.state.arrivalAirport}
                  onChange={(event) => this.setState({arrivalAirport: event.target.value})}
               />
               <Divider />
               <br />
               <span className='search_options_label'>Filter by passenger limit:</span>
               <TextField
                  label="Passenger Limit"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={this.state.passengerLimit || ""}
                  onChange={(event) => this.setState({passengerLimit: parseInt(event.target.value)})}
               />
               <Divider />
               <br />
               <Button variant="outlined" onClick={() => this.props.search(this.state)}>Search</Button>
            </AccordionDetails>
         </Accordion>
      );
   }
}

export default FlightSearchOptions;
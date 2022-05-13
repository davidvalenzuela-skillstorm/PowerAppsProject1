import { Accordion, AccordionSummary, Typography, AccordionDetails, TextField, Divider, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';

type FlightSearchOptionsState =
{
   flightNumber : number,
   departureSelect: number,
   departureDateTime1 : Date,
   departureDateTime2 : Date,
   arrivalSelect: number,
   arrivalDateTime1 : Date,
   arrivalDateTime2 : Date,
   departureAirport : string,
   arrivalAirport : string,
   passengerLimit : number
}

class FlightSearchOptions extends React.Component<any, FlightSearchOptionsState>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         flightNumber: 0,
         departureSelect: 1,
         departureDateTime1: new Date(),
         departureDateTime2: new Date(),
         arrivalSelect: 1,
         arrivalDateTime1: new Date(),
         arrivalDateTime2: new Date(),
         departureAirport: "",
         arrivalAirport: "",
         passengerLimit: 0
      }
   }

   render()
   {
      return (
         <Accordion>
            <AccordionSummary expandIcon="&#9660;">
               <Typography>Search Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
               <span>Filter by flight number:</span>
               <TextField
                  label="Flight Number"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={this.state.flightNumber}
                  onChange={(event) => this.setState({flightNumber: parseInt(event.target.value)})}
               />
               <Divider />
               <br />
               <span>Filter by departure date/time:</span>
               <Select
                  value={this.state.departureSelect.toString()}
                  onChange={(event : SelectChangeEvent) => this.setState({departureSelect: parseInt(event.target.value)})}
               >
                  <MenuItem value={0}>Before</MenuItem>
                  <MenuItem value={1}>After</MenuItem>
                  <MenuItem value={2}>Between</MenuItem>
               </Select>
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
               <Divider />
               <br />
               <span>Filter by arrival date/time:</span>
               <Select
                  value={this.state.arrivalSelect.toString()}
                  onChange={(event : SelectChangeEvent) => this.setState({arrivalSelect: parseInt(event.target.value)})}
               >
                  <MenuItem value={0}>Before</MenuItem>
                  <MenuItem value={1}>After</MenuItem>
                  <MenuItem value={2}>Between</MenuItem>
               </Select>
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
               <Divider />
               <br />
               <span>Filter by airports:</span>
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
               <span>Filter by passenger limit:</span>
               <TextField
                  label="Passenger Limit"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={this.state.passengerLimit}
                  onChange={(event) => this.setState({passengerLimit: parseInt(event.target.value)})}
               />
               <Divider />
               <br />
               <Button variant="outlined">Search</Button>
            </AccordionDetails>
         </Accordion>
      );
   }
}

export default FlightSearchOptions;
import { Button } from '@mui/material';
import React from 'react';
import APIService from '../../services/apiService';
import { Flight, FlightDataParams } from '../../view-models/flight';
import FlightAddMenu from '../flight_add_menu';
import FlightDataTable from '../flight_data_table';
import FlightSearchOptions from '../flight_search_options';

type FlightsViewState =
{
   data : Array<Flight>,
   searchParams : FlightDataParams,
   addMenuOpen : boolean
};

class FlightsView extends React.Component<any, FlightsViewState>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         data: [],
         searchParams:
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
         },
         addMenuOpen: false
      }
      this.updateFlightData = this.updateFlightData.bind(this);
      this.closeAddMenu = this.closeAddMenu.bind(this);
   }

   componentDidMount()
   {
      // Load all flight data
      APIService.getFlights().then(flightData => this.setState({data: flightData}))
   }

   updateFlightData(params : FlightDataParams | undefined)
   {
      if (params) // If parameters given, probably called from <FlightSearchOptions>
      {
         this.setState({searchParams: params});
         APIService.getFlightsWithParams(params).then(flightData => this.setState({data: flightData}));
      }
      else // If no parameters given, probably just want to refresh data table
      {
         APIService.getFlightsWithParams(this.state.searchParams).then(flightData => this.setState({data: flightData}));
      }
   }

   closeAddMenu()
   {
      this.setState({addMenuOpen: false});
   }

   render()
   {
      return (
         <div className='flights_view'>
            <h1>Managing Flights</h1>
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outlined" onClick={() => this.setState({addMenuOpen: true})}>Add new flight</Button>
            <FlightAddMenu open={this.state.addMenuOpen} onClose={this.closeAddMenu} update={this.updateFlightData} />
            <br />
            <FlightSearchOptions search={this.updateFlightData} />
            {this.state.data.length > 0 ?
               <FlightDataTable flightData={this.state.data} update={this.updateFlightData} /> // Display this if there is data
               :
               <h2>No entries found</h2> // Display this if there is no data
            }
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outlined" onClick={() => this.setState({addMenuOpen: true})}>Add new flight</Button>
            <FlightAddMenu open={this.state.addMenuOpen} onClose={this.closeAddMenu} update={this.updateFlightData} />
         </div>
      );
   }
}

export default FlightsView;
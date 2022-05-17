import { Button } from '@mui/material';
import React from 'react';
import APIService from '../../services/apiService';
import { Flight, FlightDataParams } from '../../view-models/flight';
import FlightDataTable from '../flight_data_table';
import FlightSearchOptions from '../flight_search_options';

type FlightsViewProps =
{
   data : Array<Flight>
};

class FlightsView extends React.Component<any, FlightsViewProps>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         data: []
      }
      this.updateFlightData = this.updateFlightData.bind(this);
   }

   componentDidMount()
   {
      // Load all flight data
      APIService.getFlights().then(flightData => this.setState({data: flightData}))
   }

   updateFlightData(params : FlightDataParams)
   {
      APIService.getFlightsWithParams(params).then(flightData => this.setState({data: flightData}));
   }

   render()
   {
      return (
         <div className='flights_view'>
            <h1>Managing Flights</h1>
            <FlightSearchOptions search={this.updateFlightData} />
            {this.state.data.length > 0 ?
               <FlightDataTable flightData={this.state.data} /> // Display this if there is data
               :
               <h2>No entries found</h2> // Display this if there is no data
            }
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
         </div>
      );
   }
}

export default FlightsView;
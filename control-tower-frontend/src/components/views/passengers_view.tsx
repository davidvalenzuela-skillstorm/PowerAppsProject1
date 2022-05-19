import { Button, Skeleton } from '@mui/material';
import React from 'react';
import APIService from '../../services/apiService';
import { Passenger, PassengerDataParams } from '../../view-models/passenger';
import PassengerAddMenu from '../passenger_add_menu';
import PassengerDataTable from '../passenger_data_table';
import PassengerSearchOptions from '../passenger_search_options';

type PassengerViewState =
{
   data : Array<Passenger>,
   searchParams : PassengerDataParams,
   addMenuOpen : boolean,
   firstLoadComplete : boolean
};

class PassengersView extends React.Component<any, PassengerViewState>
{
   constructor(props : any)
   {
      super(props);
      this.state =
      {
         data: [],
         searchParams:
         {
            name: "",
            job: "",
            email: "",
            age: null,
            flightID: null
         },
         addMenuOpen: false,
         firstLoadComplete: false
      }
      this.updatePassengerData = this.updatePassengerData.bind(this);
      this.closeAddMenu = this.closeAddMenu.bind(this);
   }

   componentDidMount()
   {
      // Load all passenger data
      this.updatePassengerData(undefined);
   }

   updatePassengerData(params : PassengerDataParams | undefined)
   {
      if (params) // If parameters given, probably called from <PassengerSearchOptions>
      {
         this.setState({searchParams: params});
         APIService.getPassengersWithParams(params).then(passengerData => this.setState(
            {
               data: passengerData,
               firstLoadComplete: true
            }));
      }
      else // If no parameters given, probably just want to refresh data table
      {
         APIService.getPassengersWithParams(this.state.searchParams).then(passengerData => this.setState(
            {
               data: passengerData,
               firstLoadComplete: true
            }));
      }
   }

   closeAddMenu()
   {
      this.setState({addMenuOpen: false});
   }

   render()
   {
      // Display skeleton if component hasn't loaded data for the first time yet
      let dataJSX = (
         <>
            <Skeleton variant="rectangular" height={50} />
            <br />
            <Skeleton variant="rectangular" height={50} />
            <br />
            <Skeleton variant="rectangular" height={50} />
            <br />
            <Skeleton variant="rectangular" height={50} />
            <br />
            <Skeleton variant="rectangular" height={50} />
         </>
      );
      if (this.state.firstLoadComplete)
      {
         dataJSX = this.state.data.length > 0 ?
         <PassengerDataTable passengerData={this.state.data} update={this.updatePassengerData} /> // Display this if there is data
         :
         <h2>No entries found</h2> // Display this if there is no data
      }

      return (
         <div className='passengers_view'>
            <h1>Managing Passengers</h1>
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outlined" onClick={() => this.setState({addMenuOpen: true})}>Add new passenger</Button>
            <PassengerAddMenu open={this.state.addMenuOpen} onClose={this.closeAddMenu} update={this.updatePassengerData} />
            <br />
            <PassengerSearchOptions search={this.updatePassengerData} />
            {dataJSX}
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outlined" onClick={() => this.setState({addMenuOpen: true})}>Add new passenger</Button>
            <PassengerAddMenu open={this.state.addMenuOpen} onClose={this.closeAddMenu} update={this.updatePassengerData} />
         </div>
      );
   }
}

export default PassengersView;
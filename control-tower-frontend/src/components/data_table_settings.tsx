import { Button } from '@mui/material';
import React from 'react';
import { Flight } from '../view-models/flight';
import Passenger from '../view-models/passenger';
import FlightEditMenu from './flight_edit_menu';
//import FlightEditMenu from './flight_edit_menu';

type DataTableSettingsProps =
{
   itemType : "flight" | "passenger",
   item : Flight | Passenger
   update : Function
};

type DataTableSettingsState =
{
   editItemMenuOpen : boolean
}

class DataTableSettings extends React.Component<DataTableSettingsProps, DataTableSettingsState>
{
   constructor(props : DataTableSettingsProps)
   {
      super(props);
      this.state =
      {
         editItemMenuOpen: false
      }
      this.deleteItem = this.deleteItem.bind(this);
      this.closeEditItemMenu = this.closeEditItemMenu.bind(this);
      this.editItem = this.editItem.bind(this);
   }

   deleteItem()
   {
   }

   closeEditItemMenu()
   {
      this.setState({editItemMenuOpen: false});
   }

   editItem()
   {
   }

   render()
   {
      return (
         <span>
            <Button size="small">&#10006;</Button>
            <Button size="small" onClick={() => this.setState({editItemMenuOpen: true})}>&#9998;</Button>
            <FlightEditMenu open={this.state.editItemMenuOpen} onClose={this.closeEditItemMenu} item={this.props.item} update={this.props.update} />
         </span>
      );
   }
}

export default DataTableSettings;
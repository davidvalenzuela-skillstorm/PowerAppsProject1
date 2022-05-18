import { Button } from '@mui/material';
import React from 'react';
import { Flight } from '../view-models/flight';
import Passenger from '../view-models/passenger';
import FlightDeleteDialog from './flight_delete_dialog';
import FlightEditMenu from './flight_edit_menu';

type DataTableSettingsProps =
{
   itemType : "flight" | "passenger",
   item : Flight | Passenger
   update : Function
};

type DataTableSettingsState =
{
   deleteDialogOpen : boolean,
   editItemMenuOpen : boolean
}

class DataTableSettings extends React.Component<DataTableSettingsProps, DataTableSettingsState>
{
   constructor(props : DataTableSettingsProps)
   {
      super(props);
      this.state =
      {
         deleteDialogOpen: false,
         editItemMenuOpen: false
      }
      this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
      this.closeEditItemMenu = this.closeEditItemMenu.bind(this);
   }

   closeDeleteDialog()
   {
      this.setState({deleteDialogOpen: false});
   }

   closeEditItemMenu()
   {
      this.setState({editItemMenuOpen: false});
   }

   render()
   {
      return (
         <span>
            <Button size="small" onClick={() => this.setState({deleteDialogOpen: true})}>&#10006;</Button>
            <Button size="small" onClick={() => this.setState({editItemMenuOpen: true})}>&#9998;</Button>
            <FlightEditMenu open={this.state.editItemMenuOpen} onClose={this.closeEditItemMenu} item={this.props.item} update={this.props.update} />
            <FlightDeleteDialog open={this.state.deleteDialogOpen} onClose={this.closeDeleteDialog} item={this.props.item} update={this.props.update} />
         </span>
      );
   }
}

export default DataTableSettings;
import { Button } from '@mui/material';
import React from 'react';
import { Flight } from '../view-models/flight';
import { Passenger } from '../view-models/passenger';
import FlightDeleteDialog from './flight_delete_dialog';
import FlightEditMenu from './flight_edit_menu';
import PassengerDeleteDialog from './passenger_delete_dialog';
import PassengerEditMenu from './passenger_edit_menu';

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
      // Choose the right components based on item type (flight or passenger)
      let editMenu = <FlightEditMenu open={this.state.editItemMenuOpen} onClose={this.closeEditItemMenu} item={this.props.item} update={this.props.update} />;
      let deleteDialog = <FlightDeleteDialog open={this.state.deleteDialogOpen} onClose={this.closeDeleteDialog} item={this.props.item} update={this.props.update} />;
      if (this.props.itemType === 'passenger')
      {
         editMenu = <PassengerEditMenu open={this.state.editItemMenuOpen} onClose={this.closeEditItemMenu} item={this.props.item} update={this.props.update} />;
         deleteDialog = <PassengerDeleteDialog open={this.state.deleteDialogOpen} onClose={this.closeDeleteDialog} item={this.props.item} update={this.props.update} />;
      }

      return (
         <span>
            <Button size="small" onClick={() => this.setState({deleteDialogOpen: true})}>&#10006;</Button>
            <Button size="small" onClick={() => this.setState({editItemMenuOpen: true})}>&#9998;</Button>
            {editMenu}
            {deleteDialog}
         </span>
      );
   }
}

export default DataTableSettings;
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import React from 'react';
import APIService from '../services/apiService';

class FlightDeleteDialog extends React.Component<any>
{
   constructor(props : any)
   {
      super(props);
      this.deleteItem = this.deleteItem.bind(this);
   }

   deleteItem()
   {
      APIService.deleteFlight(this.props.item.id)
      .then(() =>
      {
         this.props.update();
         this.props.onClose();
      });
   }

   render()
   {
      return (
         <Dialog
            open={this.props.open}
            onClose={() => this.props.onClose()}
            aria-labelledby="deleteDialogTitle"
            aria-describedby="deleteDialogBody"
         >
         <DialogTitle id="deleteDialogTitle">
            WARNING: Delete flight {this.props.item.id}?
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="deleteDialogBody">
               The data for this flight will be deleted, this action cannot be undone.
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="outlined" onClick={() => this.props.onClose()} autoFocus>Cancel</Button>
            <Button variant="contained" onClick={() => this.deleteItem()}>Confirm</Button>
         </DialogActions>
         </Dialog>
      );
   }
}

export default FlightDeleteDialog;
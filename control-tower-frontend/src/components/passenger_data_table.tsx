import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React from 'react';
import { Passenger } from '../view-models/passenger';
import DataTableSettings from './data_table_settings';
import PassengerBookings from './passenger_bookings';

type PassengerDataTableProps =
{
   passengerData : Array<Passenger>;
   update : Function
};

type PassengerDataTableState =
{
   bookingMenuOpen : boolean,
   bookingMenuItem : Passenger | null
}

class PassengerDataTable extends React.Component<PassengerDataTableProps, PassengerDataTableState>
{
   constructor(props : PassengerDataTableProps)
   {
      super(props);
      this.state =
      {
         bookingMenuOpen: false,
         bookingMenuItem: null
      }
      this.openBookingMenu = this.openBookingMenu.bind(this);
      this.closeBookingMenu = this.closeBookingMenu.bind(this);
   }

   openBookingMenu(item : Passenger)
   {
      this.setState(
      {
         bookingMenuOpen: true,
         bookingMenuItem: item
      });
   }
      
   closeBookingMenu()
   {
      this.setState(
      {
         bookingMenuOpen: false,
         bookingMenuItem: null
      });
   }

   render(): React.ReactNode {
      return (
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Settings</TableCell>
                     <TableCell>Name</TableCell>
                     <TableCell align="right">Job</TableCell>
                     <TableCell align="right">Email</TableCell>
                     <TableCell align="right">Age</TableCell>
                     <TableCell>View bookings</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {this.props.passengerData.map((entry) => (
                     <TableRow key={entry.id}>
                        <TableCell><DataTableSettings itemType="passenger" item={entry} update={this.props.update} /></TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell align="right">{entry.job}</TableCell>
                        <TableCell align="right">{entry.email}</TableCell>
                        <TableCell align="right">{entry.age}</TableCell>
                        <TableCell>
                           <Button variant="outlined" size="small" onClick={() => this.openBookingMenu(entry)}>&#9992;</Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
            {this.state.bookingMenuOpen &&
            <PassengerBookings
               open={this.state.bookingMenuOpen}
               onClose={() => this.closeBookingMenu()}
               passenger={this.state.bookingMenuItem ?? this.props.passengerData[0]}
            />}
         </TableContainer>
      );
   }
}

export default PassengerDataTable;
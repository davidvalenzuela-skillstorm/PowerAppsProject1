import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import React from 'react';
import { Passenger } from '../view-models/passenger';
import DataTableSettings from './data_table_settings';

type PassengerDataTableProps =
{
   passengerData : Array<Passenger>;
   update : Function
};

class PassengerDataTable extends React.Component<PassengerDataTableProps>
{
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
                     <TableCell align="right">Booking Number</TableCell>
                     <TableCell>View flights</TableCell>
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
                        <TableCell align="right">{entry.flightID}</TableCell>
                        <TableCell><Button variant="outlined" size="small">&#9992;</Button></TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
      );
   }
}

export default PassengerDataTable;
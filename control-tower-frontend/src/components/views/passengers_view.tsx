import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

var testData = [
   {id: 101, name: "John Johnson", job: "Sponge cleaner", email: "jj@email.com", age: "39", bookingNumber: "102"},
   {id: 102, name: "Mary Maryland", job: "Ant manager", email: "mm@email.com", age: "23", bookingNumber: "101"},
   {id: 103, name: "Bob Bobson", job: "Chairsitter", email: "bb@email.com", age: "54", bookingNumber: "102"}
]

class PassengersView extends React.Component<any, any>
{
   render()
   {
      return (
         <div className="flights_passengers">
            <h1>Managing Passengers</h1>
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Job</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Age</TableCell>
                        <TableCell align="right">Booking Number</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {testData.map((entry) => (
                        <TableRow key={entry.id}>
                           <TableCell>{entry.name}</TableCell>
                           <TableCell align="right">{entry.job}</TableCell>
                           <TableCell align="right">{entry.email}</TableCell>
                           <TableCell align="right">{entry.age}</TableCell>
                           <TableCell align="right">{entry.bookingNumber}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
            <br />
            <Button variant="contained" onClick={() => this.props.changeView(0)}>Go back</Button>
         </div>
      );
   }
}

export default PassengersView;
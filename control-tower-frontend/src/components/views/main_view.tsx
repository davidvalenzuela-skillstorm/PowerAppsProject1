import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

class MainView extends React.Component<any, any>
{
   render ()
   {
      return (
         <div className="main_view">
            <br />
            <Typography component="h1" variant="h4" color="secondary">Welcome back to Control Tower!</Typography>
            <br />
            <Stack spacing={2}>
               <Button variant="contained" onClick={() => this.props.changeView(1)}>Manage Flights</Button>
               <Button variant="contained" onClick={() => this.props.changeView(2)}>Manage Passengers</Button>
            </Stack>
         </div>
      );
   }
}

export default MainView;
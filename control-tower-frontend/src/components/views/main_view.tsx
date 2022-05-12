import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

class MainView extends React.Component<any, any>
{
   render ()
   {
      return (
         <div className="main_view">
            <h1>Welcome back to Control Tower!</h1>
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
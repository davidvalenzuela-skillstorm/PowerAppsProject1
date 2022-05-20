import { Paper } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import './App.css';
import FlightsView from './components/views/flights_view';
import MainView from './components/views/main_view';
import PassengersView from './components/views/passengers_view';

const darkTheme = createTheme(
{
  palette:
  {
    mode: 'dark'
  }
});

enum Views
{
   MainView = 0,
   FlightsView = 1,
   PassengersView = 2
};

type AppState =
{
  currentView: Views
}

class App extends React.Component<any, AppState>
{
  constructor(props: any)
  {
    super(props);
    this.state =
    {
      currentView: Views.MainView,
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(newView : Views) : void
  {
    this.setState({currentView: newView});
  }

  render ()
  {
    // Render the current view selected
    let view;
    switch (this.state.currentView)
    {
      default:
      case Views.MainView:
        view = <MainView changeView={this.changeView} />;
        break;
      case Views.FlightsView:
        view = <FlightsView changeView={this.changeView} />;
        break;
      case Views.PassengersView:
        view = <PassengersView changeView={this.changeView} />;
        break;
    }

    return (
      <ThemeProvider theme={darkTheme}>
        <Paper elevation={0} style={{width: '100%', height: '100%', paddingTop: '25px'}}>
          <div className="App">
            {view}
          </div>
        </Paper>
      </ThemeProvider>
    );
  }
}

export default App;

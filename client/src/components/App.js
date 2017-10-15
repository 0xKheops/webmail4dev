import React, { Component } from 'react';
import MailList from "../containers/MailList"
import MailDetails from "../containers/MailDetails";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import './App.css';

class App extends Component {

  render() {

    return (
      <MuiThemeProvider>
        <div className="App layout-fill">
          <div className="App-AppBar">
            <AppBar title="webmail4dev" />
          </div>
          <div className="App-workspace">
            <div className="App-nav">
              <MailList />
            </div>
            <div className="App-main ms-bgColor-themePrimary">
              <MailDetails />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

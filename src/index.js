import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

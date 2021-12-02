import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {createTheme} from '@mui/material/styles';

import Invoices from '../pages/Invoices/Invoices';
import InvoiceForm from '../pages/Invoices/InvoiceForm';


const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    IconButton: {
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <Router>
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
            <Routes>
                <Route exact path="/" element={<Invoices/>} />
                <Route exact path="/Invoices" element={<Invoices/>} />
                <Route exact path="/InvoiceForm" element={<InvoiceForm/>} />
            </Routes>
        </div>
      <CssBaseline />
    </ThemeProvider>
    </Router>
  );

}

export default App;
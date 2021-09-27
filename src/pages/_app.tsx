// import App from 'next/app'
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';
import 'react-datepicker/dist/react-datepicker.css';

import Nav from '../components/Nav';
import { UserProvider } from '../context/userContext';
import { SnackbarProvider } from '../context/snackbarContext';
import SnackbarContainer from '../containers/SnackbarContainer';

import theme from '../styles/theme';
import '../styles/styles.scss';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <SnackbarProvider>
            <Nav />
            <Component {...pageProps} />
            <SnackbarContainer />
          </SnackbarProvider>
        </UserProvider>
      </ThemeProvider>
    );
  }
}

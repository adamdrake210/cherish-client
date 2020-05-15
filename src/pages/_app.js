// import App from 'next/app'
import React from 'react';
import '../styles/styles.scss';
import Nav from '../components/Nav';
import 'react-datepicker/dist/react-datepicker.css';
import { UserProvider } from '../context/userContext';
import { SnackbarProvider } from '../context/snackbarContext';

import SnackbarContainer from '../containers/SnackbarContainer';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <SnackbarProvider>
          <Nav />
          <Component {...pageProps} />
          <SnackbarContainer />
        </SnackbarProvider>
      </UserProvider>
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async ({ appContext }) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default MyApp;

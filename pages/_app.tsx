import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppProps, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MenuAppBar from '../src/components/MenuAppBar';
import Copyright from '../src/Copyright';
import { wrapper } from "../src/store/store";
import theme from '../src/theme';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const store = useStore((state => state));

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <PersistGate loading={<div>loading</div>} persistor={store.__persistor}>
      <React.Fragment>
        <Head>
          <title>MitoFC</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MenuAppBar />
          {/* <Container maxWidth="sm"> */}
            <Box m={1}>
              <Component {...pageProps} />
              <Copyright />
            </Box>
          {/* </Container> */}
        </ThemeProvider>
      </React.Fragment>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp)
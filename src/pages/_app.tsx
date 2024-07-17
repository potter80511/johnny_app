import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import PageLoading from 'src/components/PageLoading';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica', 'Arial', 'sans-serif';
    background-color: #000;
    color: #fff;
    margin: 0;
    img {
      display: block;
      width: 100%;
    }
  }
`;
const muiDarkTheme = createMUITheme({
  palette: {
    mode: 'dark',
  },
});

const theme = {
  palette: {
    iphoneOrange: "#c9772e",
    iphoneGreen: "#1dcc71",
    checkGreen: "#09d269",
  },
  breakpoint: {
    sm: '576px',
    md: '768px',
    lg: '1024px',
  }
};

export default function App({ Component, pageProps }: AppProps) {
  console.log('App:')
  console.log(process.env.NEXT_PUBLIC_SITE_URL, 'NEXT_PUBLIC_SITE_URL')
  console.log(process.env.VERCEL_ENV, 'VERCEL_ENV')
  console.log(process.env.NODE_ENV, 'NODE_ENV')

  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const routeEventStart = () => {
        setIsPageLoading(true);
    };
    const routeEventEnd = () => {
        setIsPageLoading(false);
    };

    Router.events.on('routeChangeStart', routeEventStart);
    Router.events.on('routeChangeComplete', routeEventEnd);
    Router.events.on('routeChangeError', routeEventEnd);
    return () => {
        Router.events.off('routeChangeStart', routeEventStart);
        Router.events.off('routeChangeComplete', routeEventEnd);
        Router.events.off('routeChangeError', routeEventEnd);
    };
  }, []);


  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MUIThemeProvider theme={muiDarkTheme}>
            {isPageLoading && <PageLoading />}
            <Component {...pageProps} />
          </MUIThemeProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

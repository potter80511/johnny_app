import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Router from 'next/router';
import PageLoading from 'src/components/PageLoading';
import Header from 'src/features/common/Header';
import { UserContext } from 'src/features/common/users/hooks';
import useUserInfo from 'src/features/common/users/hooks'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'src/styles/globals.css'

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

  h2 {
    color: #888;
    font-size: 60px;
  }
`;
const muiDarkTheme = createMUITheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#04b8d9',
      contrastText: '#fff'
    },
    secondary: {
      main: '#e2b238',
      contrastText: '#fff'
    },
    text: {
      primary: '#fff'
    }
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

  const userInfoContextValue = useUserInfo()

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
        <UserContext.Provider value={userInfoContextValue}>
          <ThemeProvider theme={theme}>
            <MUIThemeProvider theme={muiDarkTheme}>
              {isPageLoading && <PageLoading />}
              <Header/>
              <Component {...pageProps} />
              <ToastContainer/>
            </MUIThemeProvider>
          </ThemeProvider>
        </UserContext.Provider>
      </Provider>
    </>
  );
}

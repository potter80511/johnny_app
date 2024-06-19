import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { ThemeProvider as MUIThemeProvider, createTheme as createMUITheme } from '@mui/material/styles';

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
};

export default function App({ Component, pageProps }: AppProps) {
  console.log('App:')
  console.log(process.env.NEXT_PUBLIC_SITE_URL, 'NEXT_PUBLIC_SITE_URL')
  console.log(process.env.VERCEL_ENV, 'VERCEL_ENV')
  console.log(process.env.NODE_ENV, 'NODE_ENV')
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MUIThemeProvider theme={muiDarkTheme}>
            <Component {...pageProps} />
          </MUIThemeProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

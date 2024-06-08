import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider } from 'react-redux';
import { store } from 'src/store';

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

const theme = {
  palette: {
    iphoneOrange: "#c9772e",
    iphoneGreen: "#1dcc71",
    checkGreen: "#09d269",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

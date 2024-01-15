import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Helvetica', 'Arial', 'sans-serif';
    background-color: #000;
    color: #fff;
    margin: 0;
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
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

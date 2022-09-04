import type {AppProps} from "next/app";
import {AuthProvider} from "@/lib/auth";
import {ChakraProvider} from "@chakra-ui/react";
import Head from "next/head";
import theme from "@/styles/theme";
import {Global, css} from '@emotion/react';

const GlobalStyle = () => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>
      </Head>
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
    </>
  )
}

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

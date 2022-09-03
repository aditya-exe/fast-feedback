import type {AppProps} from "next/app";
import {AuthProvider} from "@/lib/auth";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "@/styles/theme";

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;

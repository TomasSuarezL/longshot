import "../../styles/globals.css";
import "@fontsource/karla/200.css";
import "@fontsource/karla/300.css";
import "@fontsource/karla/500.css";
import "@fontsource/karla/700.css";
import "@fontsource/karla/800.css";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { theme } from "../lib/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;

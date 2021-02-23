import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default MyApp;

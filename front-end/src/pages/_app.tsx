import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "../styles/globals.css";
import Layout from "@/components/Layout";
import theme from "@/theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;

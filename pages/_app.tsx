import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "@mui/material/Container";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;

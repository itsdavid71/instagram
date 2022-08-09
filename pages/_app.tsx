import "../styles/globals.css";
import type { AppProps } from "next/app";
import Container from "@mui/material/Container";
import Header from "../components/Header";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;

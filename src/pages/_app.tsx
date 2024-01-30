import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  return <Component {...pageProps} />;
}

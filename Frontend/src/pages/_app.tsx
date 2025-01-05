import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { PrimeReactProvider } from 'primereact/api';
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ThemeContextProvider } from "@/context/theme-context";
import "primereact/resources/themes/lara-dark-teal/theme.css";
import 'primeicons/primeicons.css';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <PrimeReactProvider>
      <ThemeContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </ThemeContextProvider>
    </PrimeReactProvider>
  );
}

import "@/styles/globals.css";
import { GlobalStyle, ThemeProvider, cerebellumTheme } from "@cerebruminc/cerebellum";
import type { AppProps } from "next/app";
import packageJSON from "./../../package.json";

const printBanner = () => {
  console.log(`
            Welcome to Registration v${packageJSON.version}
  `);
};

export default function App({ Component, pageProps }: AppProps) {
  // Print banner when app initializes
  if (typeof window !== "undefined") {
    printBanner();
  }

  return (
    <ThemeProvider theme={cerebellumTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

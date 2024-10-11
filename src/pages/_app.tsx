import "@/styles/globals.css";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
// Font files can be colocated inside of `app`
const neoSansRegular = localFont({
  src: "../fonts/Neo_Sans_Std_Regular.otf",
  weight: "400",
});
const neoSansBold = localFont({
  src: "../fonts/Neo_Sans_Std_Bold.otf",
  weight: "700",
});
import type { AppProps } from "next/app";
import { QueryClient } from "react-query";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

const lato = Lato({
  weight: ["700", "400"],
  preload: false,
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${lato.style.fontFamily};
        }
        .font-lato {
          font-family: ${lato.style.fontFamily};
        }
        .font-neo {
          font-family: ${neoSansRegular.style.fontFamily},
            ${neoSansBold.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

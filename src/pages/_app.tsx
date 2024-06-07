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
import { QueryClient, QueryClientProvider } from "react-query";
import { ServicesProvider } from "@/contexts/ServicesContext";
import { SessionProvider } from "@/contexts/SessionContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";

const lato = Lato({
  weight: ["700", "400"],
  preload: false,
});
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
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
      <QueryClientProvider client={queryClient}>
        <ServicesProvider>
          <SessionProvider>
            <ShoppingCartProvider>
              <Component {...pageProps} />
            </ShoppingCartProvider>
          </SessionProvider>
        </ServicesProvider>
      </QueryClientProvider>
    </>
  );
}

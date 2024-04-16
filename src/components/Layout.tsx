import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "./Header";
import { createContext, useContext, useMemo } from "react";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
interface LayoutProps {
  children: React.ReactNode;
}
const LayoutContext = createContext({} as { isMobile: boolean });

export function Layout({ children }: LayoutProps) {
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 1120,
    []
  );
  return (
    <ShoppingCartProvider>
      <LayoutContext.Provider value={{ isMobile }}>
        <div>
          <Header />
          {children}
          <ReactQueryDevtools />
        </div>
      </LayoutContext.Provider>
    </ShoppingCartProvider>
  );
}
export const useLayout = () => useContext(LayoutContext);

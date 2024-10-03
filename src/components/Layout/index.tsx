import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "./Header";
import { createContext, useContext, useEffect, useState } from "react";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { MasterContext } from "@/contexts/MasterContext";
interface LayoutProps {
  children: React.ReactNode;
}
const LayoutContext = createContext(
  {} as { isMobile?: boolean; getIsMobile: () => boolean }
);

export function Layout({ children }: LayoutProps) {
  return (
    <MasterContext>
      <div className="flex flex-col h-screen">
        <Header />
        {children}
        <ReactQueryDevtools />
      </div>
    </MasterContext>
  );
}

export function LayoutProvider({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const getIsMobile = () => {
    return window.innerWidth < 1120;
  };
  useEffect(() => {
    console.log("");
    setIsMobile(getIsMobile());
  }, []);
  return (
    <LayoutContext.Provider value={{ isMobile, getIsMobile }}>
      {children}
    </LayoutContext.Provider>
  );
}
export const useLayout = () => useContext(LayoutContext);

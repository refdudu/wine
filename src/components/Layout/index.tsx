import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "./Header";
import { createContext, useContext, useEffect, useState } from "react";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
interface LayoutProps {
  children: React.ReactNode;
}
const LayoutContext = createContext({} as { isMobile?: boolean });

export function Layout({ children }: LayoutProps) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1120);
  }, []);
  return (
    <LayoutContext.Provider value={{ isMobile }}>
      <div className="flex flex-col h-screen">
        <Header />
        {children}
        <ReactQueryDevtools />
      </div>
    </LayoutContext.Provider>
  );
}
export const useLayout = () => useContext(LayoutContext);

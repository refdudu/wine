import { QueryClient, QueryClientProvider } from "react-query";
import { ServicesProvider } from "@/contexts/ServicesContext";
import { SessionProvider } from "@/contexts/SessionContext";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { User } from "firebase/auth";
import { CookiesProvider } from "react-cookie";
import { LayoutProvider } from "@/components/Layout";

const queryClient = new QueryClient();
interface MasterContextProps {
  children: React.ReactNode;
}
export function MasterContext({ children }: MasterContextProps) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ServicesProvider>
          <LayoutProvider>
            <SessionProvider>
              <ShoppingCartProvider>{children}</ShoppingCartProvider>
            </SessionProvider>
          </LayoutProvider>
        </ServicesProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

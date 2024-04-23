import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "./Header";
import { createContext, useContext, useMemo } from "react";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";
import { useMediaQuery } from "react-responsive";
interface LayoutProps {
	children: React.ReactNode;
}
const LayoutContext = createContext({} as { isMobile: boolean });

export function Layout({ children }: LayoutProps) {
	const isMobile = useMediaQuery({
		maxWidth: 1120
	});
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

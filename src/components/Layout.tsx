import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "./Header";
interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      {children}
      <ReactQueryDevtools />
    </div>
  );
}

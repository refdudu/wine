import { Layout, useLayout } from "@/components/Layout";
import { MobileLayout } from "./MobileLayout";
import { LargeLayout } from "./LargeLayout";

export function Home() {
  return (
    <div
      className="w-full py-10 mx-auto px-3 overflow-auto h-full"
      id="products-grid"
    >
      <div className="max-w-[1120px] flex justify-center mx-auto">
        <Content />
      </div>
    </div>
  );
}
Home.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
function Content() {
  const { isMobile } = useLayout();
  if (isMobile === undefined) return <></>;
  if (isMobile) return <MobileLayout />;
  return <LargeLayout />;
}

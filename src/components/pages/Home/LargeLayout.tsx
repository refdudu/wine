import { ProductsGrid, ProductsGridProps } from "@/components/ProductsGrid";
import { useHomeLarge } from "./useHomeLarge";
import { GetProductsResponse } from "@/api/product/ProductService";
import { SideBar } from "@/components/Sidebar";

interface LargeLayoutProps {
  initialData: GetProductsResponse;
}

export function LargeLayout({ initialData }: LargeLayoutProps) {
  const {
    betweenPrices,
    handleFilterBetweenPrices,
    handleFilterSearch,
    pageIndex,
    productsResponse,
    searchText,
    setPageIndex,
  } = useHomeLarge(initialData);
  return (
    <>
      <SideBar
        betweenPrices={betweenPrices}
        changeBetweenPrice={handleFilterBetweenPrices}
      />
      {productsResponse && (
        <ProductsGrid
          {...{
            pageIndex,
            productsResponse,
            setPageIndex,
            handleFilterSearch,
            searchText,
          }}
        />
      )}
    </>
  );
}

import { ProductsGridLarge } from "@/components/ProdutsGrid/ProductsGridLarge";
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
        <ProductsGridLarge
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

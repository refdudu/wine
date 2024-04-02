import { useHomeLarge } from "./useHomeLarge";
import { GetProductsResponse } from "@/api/product/ProductService";
import { SideBar } from "@/components/Sidebar";
import { useHomeMobile } from "./useHomeMobile";
import { ProductsGridMobile } from "@/components/ProdutsGrid/ProductsGridMobile";

interface LargeLayoutProps {
  initialData: GetProductsResponse;
}

export function MobileLayout({ initialData }: LargeLayoutProps) {
  const {
    betweenPrices,
    handleFilterBetweenPrices,
    handleFilterSearch,
    pageIndex,
    productsResponse,
    searchText,
    setPageIndex,
  } = useHomeMobile(initialData);
  return (
    <>
      {productsResponse && (
        <ProductsGridMobile
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

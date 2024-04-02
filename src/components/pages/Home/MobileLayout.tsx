import { useHomeLarge } from "./useHomeLarge";
import { GetProductsResponse } from "@/api/product/ProductService";
import { SideBar } from "@/components/Sidebar";
import { useHomeMobile } from "./useHomeMobile";
import { ProductsGridMobile } from "@/components/ProdutsGrid/ProductsGridMobile";
import { ProductsGridLayout } from "@/components/ProductsGridLayout";
import { ProductCard } from "./ProductCard";

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
  const products = productsResponse?.pages.flatMap((x) => x.products) || [];

  return (
    <>
      {productsResponse && (
        <ProductsGridLayout
          searchText={searchText}
          handleFilterSearch={handleFilterSearch}
          totalProducts={0}
        >
          {products.map((product) => (
            <ProductCard key={product.name} {...{ product }} onAdd={() => {}} />
          ))}
        </ProductsGridLayout>
      )}
    </>
  );
}

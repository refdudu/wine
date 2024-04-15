import { useHomeLarge } from "./useHomeLarge";
import { GetProductsResponse } from "@/api/product/ProductService";
import { SideBar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination";
import { ProductsGridLayout } from "@/components/ProductsGridLayout";
import { ProductCard } from "./ProductCard";

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
        <>
          <ProductsGridLayout
            searchText={searchText}
            handleFilterSearch={handleFilterSearch}
            footer={
              <div className="lg:flex justify-center">
                <Pagination
                  current={pageIndex}
                  changePageIndex={setPageIndex}
                  total={Math.ceil(
                    productsResponse.total / productsResponse.pageSize
                  )}
                />
              </div>
            }
            totalProducts={productsResponse.total}
          >
            {productsResponse.products.map((product) => (
              <ProductCard
                key={product.name}
                {...{ product }}
                onAdd={() => {}}
              />
            ))}
          </ProductsGridLayout>
        </>
      )}
    </>
  );
}

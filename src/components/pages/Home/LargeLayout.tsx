import { useHomeLarge } from "./useHomeLarge";
import { GetProductsResponse } from "@/api/product/ProductService";
import { SideBar } from "@/components/Sidebar";
import { Pagination } from "@/components/Pagination";
import { ProductsGridLayout } from "@/components/pages/Home/ProductsGridLayout";
import { ProductCard } from "./ProductCard";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ProductI } from "@/interfaces/ProductI";
import { useLayout } from "@/components/Layout";
import { Loader } from "@/components/Loader";

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
    isLoading,
    isFetching,
  } = useHomeLarge(initialData);
  return (
    <>
      <SideBar
        betweenPrices={betweenPrices}
        changeBetweenPrice={handleFilterBetweenPrices}
      />
      <>
        <ProductsGridLayout
          searchText={searchText}
          handleFilterSearch={handleFilterSearch}
          footer={
            productsResponse && (
              <div className="lg:flex justify-center">
                <Pagination
                  current={pageIndex}
                  changePageIndex={setPageIndex}
                  total={Math.ceil(
                    productsResponse.total / productsResponse.pageSize
                  )}
                />
              </div>
            )
          }
          totalProducts={productsResponse?.total || 0}
        >
          <ProductGrid
            isLoading={isFetching}
            products={productsResponse?.products}
          />
        </ProductsGridLayout>
      </>
    </>
  );
}
interface ProductGridProps {
  products?: ProductI[];
  isLoading: boolean;
}
function ProductGrid({ isLoading, products }: ProductGridProps) {
  const { isMobile } = useLayout();
  const { handleAddInShoppingCart } = useShoppingCart();
  if (!products) return <></>;
  return (
    <>
      {products.map((product) => (
        <ProductCard
          key={product.name}
          {...{ product }}
          onAdd={() => handleAddInShoppingCart(product)}
        />
      ))}
    </>
  );
}

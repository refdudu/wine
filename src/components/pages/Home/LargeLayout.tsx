import { useHomeLarge } from "./useHomeLarge";
import { SideBar } from "@/components/pages/Home/Sidebar";
import { Pagination } from "@/components/Pagination";
import { ProductsGridLayout } from "@/components/pages/Home/ProductsGridLayout";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import type { ProductI } from "@/interfaces/ProductI";

// interface LargeLayoutProps {
//   initialData: GetProductsResponse;
// }

export function LargeLayout() {
  const {
    betweenPrices,
    handleFilterBetweenPrices,
    handleFilterSearch,
    pageIndex,
    productsResponse,
    searchText,
    setPageIndex,
    isFetching,
  } = useHomeLarge();
  return (
    <>
      <SideBar
        betweenPrices={betweenPrices}
        changeBetweenPrice={handleFilterBetweenPrices}
      />
      <>
        <ProductsGridLayout
          isLoading={isFetching && !productsResponse}
          searchText={searchText}
          handleFilterSearch={handleFilterSearch}
          footer={
            productsResponse && (
              <div className="lg:flex justify-center">
                <Pagination
                  current={pageIndex}
                  changePageIndex={(page) => {
                    window.scrollTo(0, 0);
                    setPageIndex(page);
                  }}
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
function ProductGrid({ products, isLoading }: ProductGridProps) {
  const { handleAddInShoppingCart } = useShoppingCart();
  if (!products) return <></>;
  if (isLoading) {
    return (
      <>
        {Array.from({ length: 9 }, (_, i) => i).map((key) => (
          <ProductCardSkeleton key={key} />
        ))}
      </>
    );
  }
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

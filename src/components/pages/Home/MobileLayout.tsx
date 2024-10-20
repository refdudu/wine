import { useHomeMobile } from "./useHomeMobile";
import { ProductsGridLayout } from "@/components/pages/Home/ProductsGridLayout";
import { ProductCard } from "./ProductCard";
import classNames from "classnames";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ProductI } from "@/interfaces/ProductI";
import { Spin } from "@/components/Spin";

export function MobileLayout() {
  const {
    isFetching,
    handleFilterSearch,
    productsResponse,
    searchText,
    fetchNextPage,
    hasNextPage,
  } = useHomeMobile();
  const { handleAddInShoppingCart } = useShoppingCart();
  const products = productsResponse?.pages?.flatMap((x) => x.products) || [];

  return (
    <ProductsGridLayout
      isLoading={isFetching}
      searchText={searchText}
      handleFilterSearch={(text) => {
        handleFilterSearch(text);
        fetchNextPage({ pageParam: 1 });
      }}
      totalProducts={productsResponse?.pages?.[0].total || 0}
      footer={
        <div className="flex flex-col gap-2 items-center">
          {isFetching && products.length > 0 && (
            <div className="flex w-full justify-center my-6">
              <Spin />
            </div>
          )}
          {hasNextPage && !isFetching && (
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className={`border font-bold filter  transition w-full py-2 font-lato  rounded-sm ${classNames(
                {
                  "cursor-not-allowed": !hasNextPage,
                  "border-custom-gray-light": !hasNextPage,
                  "text-custom-gray-light": !hasNextPage,
                  "border-custom-violet": hasNextPage,
                  "text-custom-violet": hasNextPage,
                  "hover:brightness-125": hasNextPage,
                }
              )}`}
            >
              Mostrar mais
            </button>
          )}
          {productsResponse?.pages && (
            <span className="text-custom-gray">
              Exibindo{" "}
              <span className="text-custom-gray-dark">{products.length}</span>{" "}
              de{" "}
              <span className="text-custom-gray-dark">
                {productsResponse?.pages?.[0].total || 0}
              </span>{" "}
              produtos no total
            </span>
          )}
        </div>
      }
    >
      <ProductGrid products={products} />
    </ProductsGridLayout>
  );
}
interface ProductGridProps {
  products?: ProductI[];
}
function ProductGrid({ products }: ProductGridProps) {
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

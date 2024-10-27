import { useHomeMobile } from "./useHomeMobile";
import { ProductsGridLayout } from "@/components/pages/Home/ProductsGridLayout";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import classNames from "classnames";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ProductI } from "@/interfaces/ProductI";
import { Spin } from "@/components/Spin";
import { FadersHorizontal } from "@phosphor-icons/react";
import { HomeFilterDrawer } from "./HomeFilterDrawer";
import { useState } from "react";
import { Button } from "@/components/Button";

export function MobileLayout() {
  const {
    isFetching,
    handleFilterSearch,
    productsResponse,
    searchText,
    fetchNextPage,
    hasNextPage,
  } = useHomeMobile();
  const products = productsResponse?.pages?.flatMap((x) => x.products) || [];
  const [isVisibleFilterDrawer, setIsVisibleFilterDrawer] = useState(false);
  return (
    <>
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
        <ProductGrid isLoading={isFetching} products={products} />
      </ProductsGridLayout>

      <footer className="absolute text-custom-violet bottom-0 w-full bg-white h-16 flex items-center justify-center lg:hidden">
        <Button onClick={() => setIsVisibleFilterDrawer(true)}>
          <FadersHorizontal size={24} />
          Filtrar
        </Button>
      </footer>
      <HomeFilterDrawer
        isVisible={isVisibleFilterDrawer}
        setIsVisible={setIsVisibleFilterDrawer}
      />
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

//   if (isLoading && products) {
//     return (
//       <>
//         {Array.from({ length: 9 }, (_, i) => i).map((key) => (
//           <ProductCardSkeleton key={key} />
//         ))}
//       </>
//     );
//   }

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

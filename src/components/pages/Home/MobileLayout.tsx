import { useHomeLarge } from "./useHomeLarge";
import { GetProductsResponse } from "@/api/product/ProductService";
import { SideBar } from "@/components/Sidebar";
import { useHomeMobile } from "./useHomeMobile";
import { ProductsGridLayout } from "@/components/pages/Home/ProductsGridLayout";
import { ProductCard } from "./ProductCard";
import classNames from "classnames";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

interface LargeLayoutProps {
  initialData: GetProductsResponse;
}

export function MobileLayout({ initialData }: LargeLayoutProps) {
  const {
    betweenPrices,
    handleFilterBetweenPrices,
    handleFilterSearch,
    productsResponse,
    searchText,
    fetchNextPage,
    hasNextPage,
  } = useHomeMobile(initialData);
  const { handleAddInShoppingCart } = useShoppingCart();
  const products = productsResponse?.pages?.flatMap((x) => x.products) || [];

  return (
    <>
      <SideBar
        betweenPrices={betweenPrices}
        changeBetweenPrice={handleFilterBetweenPrices}
      />
      {productsResponse && (
        <ProductsGridLayout
          searchText={searchText}
          handleFilterSearch={(text) => {
            handleFilterSearch(text);
            fetchNextPage({ pageParam: 1 });
          }}
          totalProducts={productsResponse.pages?.[0].total}
          footer={
            <div className="flex flex-col gap-2 items-center">
              <button
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
              <span className="text-custom-gray">
                Exibindo{" "}
                <span className="text-custom-gray-dark">{products.length}</span>{" "}
                de{" "}
                <span className="text-custom-gray-dark">
                  {productsResponse.pages?.[0].total}
                </span>{" "}
                produtos no total
              </span>
            </div>
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...{ product }}
              onAdd={() => handleAddInShoppingCart(product)}
            />
          ))}
        </ProductsGridLayout>
      )}
    </>
  );
}

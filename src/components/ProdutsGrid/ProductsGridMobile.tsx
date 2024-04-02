import { GetProductsResponse } from "@/api/product/ProductService";
import { ProductCard } from "../pages/Home/ProductCard";
import { Pagination } from "../Pagination";
import { ProductsGridLayout } from "./ProductsGridLayout";
import { InfiniteData } from "react-query";

export interface ProductsGridProps {
  productsResponse: InfiniteData<GetProductsResponse>;
  pageIndex: number;
  setPageIndex: (index: number | string) => void;
  handleFilterSearch: (text: string) => void;
  searchText: string;
}

export function ProductsGridMobile({
  productsResponse,
  searchText,
  handleFilterSearch,
}: ProductsGridProps) {
  const products = productsResponse.pages.flatMap((x) => x.products);
  return (
    <ProductsGridLayout
      searchText={searchText}
      handleFilterSearch={handleFilterSearch}
      totalProducts={0}
    >
      {products.map((product) => (
        <ProductCard key={product.name} {...{ product }} onAdd={() => {}} />
      ))}
    </ProductsGridLayout>
  );
}

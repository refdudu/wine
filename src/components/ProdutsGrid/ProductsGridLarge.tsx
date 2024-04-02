import { GetProductsResponse } from "@/api/product/ProductService";
import { ProductCard } from "../pages/Home/ProductCard";
import { Pagination } from "../Pagination";
import { ProductsGridLayout } from "./ProductsGridLayout";

export interface ProductsGridProps {
  productsResponse: GetProductsResponse;
  pageIndex: number;
  setPageIndex: (index: number | string) => void;
  handleFilterSearch: (text: string) => void;
  searchText: string;
}

export function ProductsGridLarge({
  productsResponse,
  pageIndex,
  setPageIndex,
  searchText,
  handleFilterSearch,
}: ProductsGridProps) {
  return (
    <ProductsGridLayout
      searchText={searchText}
      handleFilterSearch={handleFilterSearch}
      footer={
        <Pagination
          current={pageIndex}
          changePageIndex={setPageIndex}
          total={Math.ceil(productsResponse.total / productsResponse.pageSize)}
        />
      }
      totalProducts={productsResponse.total}
    >
      {productsResponse.products.map((product) => (
        <ProductCard key={product.name} {...{ product }} onAdd={() => {}} />
      ))}
    </ProductsGridLayout>
  );
}

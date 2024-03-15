import { GetProductsResponse } from "@/api/product/ProductService";
import { ProductCard } from "./pages/Home/ProductCard";
import { Pagination } from "./Pagination";

interface ProductsGridProps {
  productsResponse: GetProductsResponse;
  pageIndex: number;
  setPageIndex: (index: number) => void;
}

export function ProductsGrid({
  productsResponse,
  pageIndex,
  setPageIndex,
}: ProductsGridProps) {
  return (
    <main className="flex-1 ">
      <span onClick={() => {}}>
        <b>{productsResponse.total}</b> produtos encontrados
      </span>

      <div className="grid-products my-6 flex-1">
        {productsResponse.products.map((product) => (
          <ProductCard key={product.name} {...{ product }} onAdd={() => {}} />
        ))}
      </div>
      <div className="flex justify-center ">
        <Pagination
          current={pageIndex}
          changePageIndex={setPageIndex}
          total={Math.ceil(productsResponse.total / productsResponse.pageSize)}
        />
      </div>
    </main>
  );
}

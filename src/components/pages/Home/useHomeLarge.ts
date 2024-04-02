import { useQuery } from "react-query";
import { useHome } from "./useHome";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useServices } from "@/contexts/ServicesContext";
import { ProductI } from "@/interfaces/ProductI";
import { useEffect, useMemo, useState } from "react";
export const useHomeLarge = (initialData: GetProductsResponse) => {
  const isMobile = useMemo(
    () => typeof window !== "undefined" && window.innerWidth < 1120,
    []
  );
  const useHomeProps = useHome();
  const { betweenPrices, pageIndex, searchText } = useHomeProps;
  const { productService } = useServices();
  const [products, setProducts] = useState<ProductI[]>([]);
  console.log("🚀 ~ useHomeLarge ~ products:", products);
  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useQuery<GetProductsResponse>({
    queryFn: async (ctx) => {
      console.log("🚀 ~ queryFn: ~ ctx:", ctx);
      const data = await productService.getProducts({
        betweenPrices,
        pageIndex: pageIndex - 1,
        pageSize: 9,
        searchText,
      });
      return data;
    },
    queryKey: ["products", { pageIndex, betweenPrices, searchText }],
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
    onSuccess(data) {
      console.log("🚀 ~ onSuccess ~ isMobile:", isMobile);
      if (isMobile)
        setProducts((p) => {
          return [...p, ...data.products];
        });
    },
    // initialData,
  });
  return {
    ...useHomeProps,
    productsResponse,
  };
};

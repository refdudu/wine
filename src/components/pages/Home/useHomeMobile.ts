import { useInfiniteQuery, useQuery } from "react-query";
import { useHome } from "./useHome";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useServices } from "@/contexts/ServicesContext";

export const useHomeMobile = (initialData: GetProductsResponse) => {
  const useHomeProps = useHome();
  const { betweenPrices, pageIndex, searchText } = useHomeProps;
  const { productService } = useServices();

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<GetProductsResponse>({
    queryFn: async ({ pageParam = 1 }) => {
      console.log("🚀 ~ queryFn: ~ pageParam:", pageParam);
      const data = await productService.getProducts({
        betweenPrices,
        pageIndex: pageParam,
        pageSize: 8,
        searchText,
      });
      console.log("🚀 ~ queryFn: ~ data:", data);
      return data;
    },
    queryKey: ["products", { pageIndex, betweenPrices, searchText }],
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
    // initialData,
    getNextPageParam: (lastPage) => {
      console.log("🚀 ~ useHomeMobile ~ lastPage:", lastPage)
      if (lastPage.products.length < 8) return undefined;
      if (lastPage.pageIndex * lastPage.pageSize >= lastPage.total)
        return undefined;
      return lastPage.pageIndex + 1;
    },
  });
  return {
    ...useHomeProps,
    productsResponse,
    fetchNextPage,
    hasNextPage,
  };
};

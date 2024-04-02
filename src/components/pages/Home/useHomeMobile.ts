import { useInfiniteQuery, useQuery } from "react-query";
import { useHome } from "./useHome";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useServices } from "@/contexts/ServicesContext";

export const useHomeMobile = (initialData: GetProductsResponse) => {
  const useHomeProps = useHome();
  const { betweenPrices, pageIndex, searchText } = useHomeProps;
  const { productService } = useServices();

  const useQueryProps = {
    queryFn: async () => {
      const data = await productService.getProducts({
        betweenPrices,
        pageIndex: pageIndex - 1,
        pageSize: 8,
        searchText,
      });
      return data;
    },
    queryKey: ["products", { pageIndex, betweenPrices, searchText }],
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
    // initialData,
  };
  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useInfiniteQuery<GetProductsResponse>(useQueryProps);
  return {
    ...useHomeProps,
    productsResponse,
  };
};

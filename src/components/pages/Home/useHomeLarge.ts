import { useQuery } from "react-query";
import { useHome } from "./useHome";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useServices } from "@/contexts/ServicesContext";

export const useHomeLarge = (initialData: GetProductsResponse) => {
  const useHomeProps = useHome();
  const { betweenPrices, pageIndex, searchText } = useHomeProps;
  const { productService } = useServices();
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

    // initialData,
  });
  return {
    ...useHomeProps,
    productsResponse,
    isLoading,
    isFetching,
  };
};

import { GetProductsResponse } from "@/api/product/ProductService";
import { useServices } from "@/contexts/ServicesContext";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export const useHome = (initialData: GetProductsResponse) => {
  const { productService } = useServices();
  const searchParams = useSearchParams();
  const { push, query } = useRouter();

  const pageIndex = searchParams.get("pageIndex")
    ? Number(searchParams.get("pageIndex"))
    : 1;
  const betweenPrices = searchParams.get("betweenPrices") || "";
  const searchText = searchParams.get("searchText") || "";

  const {
    data: productsResponse,
    isLoading,
    isFetching,
  } = useQuery<GetProductsResponse>({
    queryFn: async () => {
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

  function setPageIndex(pageIndex: string | number) {
    push(
      {
        query: {
          ...query,
          pageIndex,
        },
      },
      undefined,
      { shallow: true }
    );
  }
  function handleFilterBetweenPrices(betweenPrices?: string) {
    push(
      {
        query: { searchText, betweenPrices, pageIndex: 1 },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }
  function handleFilterSearch(searchText: string) {
    push(
      {
        query: {
          betweenPrices,
          searchText,
          pageIndex: 1,
        },
      },
      undefined,
      { shallow: true, scroll: false }
    );
  }
  return {
    productsResponse,
    setPageIndex,
    handleFilterBetweenPrices,
    handleFilterSearch,
    betweenPrices,
    pageIndex,
    searchText,
  };
};

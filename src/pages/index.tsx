import { api } from "@/utils/api";

import { useSearchParams } from "next/navigation";
import { GetProductsResponse } from "@/api/product/ProductService";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { GetStaticProps } from "next";
import { SideBar } from "@/components/Sidebar";
import { Layout } from "@/components/Layout";
import { ProductsGrid } from "@/components/ProductsGrid";
import { ApiProductService } from "@/services/ProductsService";

interface StaticProps {
  initialData: GetProductsResponse;
}

const apiProductsService = new ApiProductService();

export default function Home({ initialData }: StaticProps) {
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
    queryFn: () =>
      apiProductsService.getProducts({
        betweenPrices,
        pageIndex: pageIndex - 1,
        pageSize: 9,
        searchText,
      }),
    queryKey: ["products", { pageIndex, betweenPrices, searchText }],
    staleTime: 1000 * 60 * 60,
    keepPreviousData: true,
    initialData,
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
      { shallow: true }
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
      { shallow: true }
    );
  }

  return (
    <Layout>
      <div className="max-w-[1120px] w-full my-10 flex justify-between mx-auto px-3">
        <SideBar
          betweenPrices={betweenPrices}
          changeBetweenPrice={handleFilterBetweenPrices}
        />
        {productsResponse && (
          <ProductsGrid
            {...{
              pageIndex,
              productsResponse,
              setPageIndex,
              handleFilterSearch,
              searchText,
            }}
          />
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const initialData = await apiProductsService.getProducts({
    betweenPrices: "",
    pageIndex: 0,
    pageSize: 9,
    searchText: "",
  });
  return {
    props: {
      initialData,
    },
    revalidate: false,
  };
};
